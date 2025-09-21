import { pdfjs, Document, Page } from 'react-pdf';
import type { SearchResult } from '../types';
import { useEffect, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdfDocument: SearchResult['documents'][number];
  jumpToMatch: string;
}

const PdfViewer = ({ pdfDocument, jumpToMatch }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageHeight, setPageHeight] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const pdfUrl = `/api/pdf/${pdfDocument.filename}`;

  const storePageHeight = (height: number) => {
    if (!pageHeight) {
      setPageHeight(height);
    }
  };

  const matchesToHighlight = (pdfDocument: SearchResult['documents'][number]) => {
    return pdfDocument.matches.map(match => ({
      page: match.page,
      coords: match.coords,
    }));
  };

  const highlightMatches = matchesToHighlight(pdfDocument);

  useEffect(() => {
    const element = document.getElementById(jumpToMatch);
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, [jumpToMatch]);

  return (
    <div style={{ display: 'inline-block', height: '400px', overflowY: 'auto' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<div>Henter PDF...</div>}>
        {Array.from(new Array(numPages), (_el, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={(page) => storePageHeight(page.height)}
              loading={null}
            />
            {highlightMatches
              .filter(highlight => highlight.page === index + 1)
              .map((highlight, index) => (
                <div key={`${highlight.page}-${index}`} id={`match_${highlight.page}-${highlight.coords.x}-${highlight.coords.y}`} style={{ position: 'absolute', backgroundColor: 'yellow', opacity: '0.4',
                  left: highlight.coords.x, top: pageHeight - highlight.coords.y - highlight.coords.h,
                  width: highlight.coords.w, height: highlight.coords.h }}/>
              ))
            }
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
