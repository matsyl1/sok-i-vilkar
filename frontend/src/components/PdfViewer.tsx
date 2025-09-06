import { pdfjs, Document, Page } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  query: string;
  filename: string;
}

const PdfViewer = ({ query, filename }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const pdfUrl = `/api/pdf/${filename}`;

  const highlightQueryMatches = ({ str }: { str: string }): string => {
    const regex = new RegExp(`\\b(${query})\\b`, 'gi');
    return str.replace(regex, '<mark style="background-color: yellow;">$1</mark>');
  };

  return (
    <div style={{ display: 'inline-block', height: '400px', overflowY: 'auto' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={true}
            renderAnnotationLayer={false}
            customTextRenderer={highlightQueryMatches}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
