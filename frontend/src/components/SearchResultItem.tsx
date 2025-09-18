import type { SearchResult } from '../types';
import { useEffect, useState } from 'react';
import PdfViewer from './PdfViewer';

interface SearchResultItemProps {
  document: SearchResult['documents'][number];
  query: string;
}

const SearchResultItem = ({ document, query }: SearchResultItemProps) => {
  const [showPdf, setShowPdf] = useState<boolean>(false);

  useEffect(() => {
    setShowPdf(false);
  },[query]);

  return (
    <div key={document.filename}>
      <h4>{document.filename} ({document.count} treff)</h4>
      <button onClick={() => setShowPdf(prev => !prev)}>vis/skjul PDF</button>
      <ul>
        {document.matches.map((match, index) => (
          <li key={index}>
            {match.snippet} {`(side ${match.page})`}
          </li>
        ))}
      </ul>
      {showPdf &&
      <PdfViewer document={document} />}
    </div>
  );
};

export default SearchResultItem;
