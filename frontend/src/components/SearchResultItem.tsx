import type { SearchResult } from '../types';
import { useState } from 'react';
import PdfViewer from './PdfViewer';

interface SearchResultItemProps {
  query: string;
  document: SearchResult['documents'][number];
}

const SearchResultItem = ({ query, document }: SearchResultItemProps) => {
  const [showPdf, setShowPdf] = useState(false);

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
      <PdfViewer filename={document.filename} query={query} />}
    </div>
  );
};

export default SearchResultItem;
