import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import type { SearchResult } from './types';

const App = () => {
  const [resMessage, setResMessage] = useState<SearchResult | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) {
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResMessage(data);

    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('unknown error', error);
      }
    }
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch}/>
      <SearchResults resMessage={resMessage}/>
    </>
  );
};

export default App;
