import type { SearchResult } from '../types';

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
        .map(document => (
          <div key={document.filename}>
            <h4>{document.filename} ({document.count})</h4>
            <ul>
              {document.matches.map((match, index) => (
                <li key={index}>
                  {match}
                </li>
              ))}
            </ul>
          </div>
        ))}
      {/* {resMessage && (
        <pre>{JSON.stringify(resMessage, null, 2)}</pre>
      )} */}
    </>
  );
};

export default SearchResults;
