import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Alert from './components/Alert';
import type { SearchResult } from './types';

const App = () => {
  const [resMessage, setResMessage] = useState<SearchResult | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) {
      return;
    }

    const showAlert = (message: string) => {
      setAlertMessage(message);
      setResMessage(null);
    };

    const showResult = (result: SearchResult, message: string) => {
      setResMessage(result);
      setAlertMessage(message);
    };

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if(!res.ok) {
        showAlert(data.message);
      } else {
        showResult(data, data.message);
      }

    } catch (err) {
      console.log(err);
      showAlert('Noe gikk galt - prøv igjen senere');
    }
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch}/>
      <Alert resMessage={resMessage} alertMessage={alertMessage} />
      <SearchResults resMessage={resMessage}/>
    </>
  );
};

export default App;
