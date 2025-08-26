import { useState } from 'react';

interface SearchBarProps {
  handleSearch: (query: string) => Promise<void>; //async funksjon i app.tsx, komponent får ikke noe return value
  resMessage: string;
}

const SearchBar = ({ handleSearch, resMessage }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleClick = () => {
    handleSearch(query);
    setQuery('');
  };

  return (
    <div>
      <h4>Søk i vilkår</h4>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
      <button onClick={handleClick}>Søk</button>
      <div>{resMessage}</div>
    </div>
  );
};

export default SearchBar;
