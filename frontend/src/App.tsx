import { useState } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const [resMessage, setResMessage] = useState<string>('');

  const handleSearch = async (query: string) => {
    if (!query) {
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResMessage(data.message);

    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
        setResMessage('failed to send query to backend');
      } else {
        console.log('unknown error', error);
        setResMessage('unknown error');
      }
    }
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} resMessage={resMessage}/>
    </>
  );
};

export default App;
