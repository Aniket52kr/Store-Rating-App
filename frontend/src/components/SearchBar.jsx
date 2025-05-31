import React from 'react';

const SearchBar = ({ query, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      className="p-2 border border-gray-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
