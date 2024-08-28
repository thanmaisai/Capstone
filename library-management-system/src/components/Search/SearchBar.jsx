// components/SearchComponent.js
import React from 'react';

function SearchBar({ searchText, setSearchText, onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search students by name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border rounded-lg px-4 py-2 mr-2 w-full max-w-xs"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-2"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;