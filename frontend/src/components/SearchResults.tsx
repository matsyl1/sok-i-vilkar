import type { SearchResult } from '../types';

interface SearchResultsProps {
  resMessage: SearchResult | null; //innkommende JSON eller null
}

const SearchResults = ({ resMessage }: SearchResultsProps) => {
  return (
    <div>
      {resMessage && (
        <pre>{JSON.stringify(resMessage, null, 2)}</pre>
      )}
    </div>
  );
};

export default SearchResults;
