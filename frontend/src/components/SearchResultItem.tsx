import type { SearchResult } from '../types';
import { useEffect, useState } from 'react';
import PdfViewer from './PdfViewer';
import '../styles.css';

interface SearchResultItemProps {
  document: SearchResult['documents'][number];
  query: string;
  showDetails: string | null;
  setShowDetails: (document: string | null) => void;
}

const SearchResultItem = ({ document, query, showDetails, setShowDetails }: SearchResultItemProps) => {
  const [jumpToMatch, setJumpToMatch] = useState<string>('');
  const isOpen = showDetails === document.filename;

  useEffect(() => {
    setShowDetails(null);
  },[query, setShowDetails]);

  return (
    <div key={document.filename}>
      <button className='button' onClick={() => {
        setShowDetails(isOpen ? null : document.filename);
        setJumpToMatch('');
      }}>
        <p>{document.filename} ({document.count} treff)</p>
      </button>

      {isOpen &&
      <>
        <ul>
          {document.matches.map((match, index) => (
            <li key={index}>
              <button className='button' onClick={() => setJumpToMatch(`match_${match.page}-${match.coords.x}-${match.coords.y}`)}>
                {match.snippet} {`(side ${match.page})`}
              </button>
            </li>
          ))}
        </ul>
        <PdfViewer pdfDocument={document} jumpToMatch={jumpToMatch}/>
      </>
      }
    </div>
  );
};

export default SearchResultItem;
