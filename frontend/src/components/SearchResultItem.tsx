import { useState } from 'react';
import PdfViewer from './PdfViewer';

interface SearchResultItemProps {
  document: {
    filename: string;
    count: number;
    matches: string[];
  };
}

const SearchResultItem = ({ document }: SearchResultItemProps) => {

  const [showPdf, setShowPdf] = useState(false);

  return (
    <div key={document.filename}>
      <h4>{document.filename} ({document.count} treff)</h4>
      <ul>
        {document.matches.map((match, index) => (
          <li key={index}>
            {match}
          </li>
        ))}
      </ul>
      <button onClick={() => setShowPdf(prev => !prev)}>vis/skjul PDF</button>
      {showPdf &&
      <PdfViewer filename={document.filename} />}
    </div>
  );

};

export default SearchResultItem;
