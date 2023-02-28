import React, { useState } from 'react';

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');

  function handleInputChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSearch(searchValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchValue} onChange={handleInputChange} placeholder="Rechercher..." />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchBar;
