import { pdfjs, Document, Page } from 'react-pdf';
import type { SearchResult } from '../types';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  document: SearchResult['documents'][number];
}

const PdfViewer = ({ document }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageHeight, setPageHeight] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const pdfUrl = `/api/pdf/${document.filename}`;

  const storePageHeight = (height: number) => {
    if (!pageHeight) {
      setPageHeight(height);
    }
  };

  const matchesToHighlight = ({ document }: PdfViewerProps) => {
    return document.matches.map(match => ({
      page: match.page,
      coords: match.coords,
    }));
  };

  const highlightMatches = matchesToHighlight({ document });

  return (
    <div style={{ display: 'inline-block', height: '400px', overflowY: 'auto' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_el, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={(page) => storePageHeight(page.height)}
            />
            {highlightMatches
              .filter(highlight => highlight.page === index + 1)
              .map((highlight, index) => (
                <div key={`${highlight.page}-${index}`} style={{ position: 'absolute', backgroundColor: 'yellow', opacity: '0.4',
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
