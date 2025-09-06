import type { SearchResult } from '../types';
import SearchResultItem from './SearchResultItem';

interface SearchResultsProps {
  resMessage: SearchResult | null; //innkommende JSON eller null
}

const SearchResults = ({ resMessage }: SearchResultsProps) => {

  if(!resMessage) {
    return null;
  }

  const searchMatch = resMessage.document.some(document => document.count > 0);

  return (
    <>
      {!searchMatch && (
        <p>{`Finner ikke noen treff på «${resMessage.query}»`}</p>
      )}

      {searchMatch && resMessage.document
        .filter(document => document.count > 0)
        .sort((a, b) => b.count - a.count)
        .map(document => (
          <SearchResultItem key={document.filename} query={resMessage.query} document={document}/>
        ))}
      {/* {resMessage && (
        <pre>{JSON.stringify(resMessage, null, 2)}</pre>
      )} */}
    </>
  );
};

export default SearchResults;
