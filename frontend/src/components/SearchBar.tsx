import { useState } from 'react';

interface SearchBarProps {
  handleSearch: (query: string) => Promise<void>; //async funksjon i app.tsx, komponent får ikke noe return value
}

const SearchBar = ({ handleSearch }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleClick = () => {
    handleSearch(query);
    setQuery('');
  };

  return (
    <div>
      <h3>Søk i vilkår</h3>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
      <button onClick={handleClick}>Søk</button>
    </div>
  );
};

export default SearchBar;
