import { useState } from 'react';
import type { SearchResult } from '../types';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  resMessage: SearchResult | null; //innkommende JSON eller null
}

const SearchResults = ({ resMessage }: SearchResultsProps) => {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  if(!resMessage) {
    return null;
  }

  const searchMatch = resMessage.documents.some(document => document.count > 0);

  return (
    <>
      {searchMatch && resMessage.documents
        .filter(document => document.count > 0)
        .sort((a, b) => b.count - a.count)
        .map(document => (
          <SearchResultItem key={document.filename} document={document} query={resMessage.query}
            showDetails={showDetails} setShowDetails={setShowDetails}/>
        ))}
      {/* {resMessage && (
        <pre>{JSON.stringify(resMessage, null, 2)}</pre>
      )} */}
    </>
  );
};

export default SearchResults;
