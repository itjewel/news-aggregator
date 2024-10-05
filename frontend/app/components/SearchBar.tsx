import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, filters: { date?: string; category?: string; source?: string }) => void; // Updated to include filters
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { date, category, source }); // Pass filters along with the query
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2 w-1/2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)} // Date filter
        className="ml-2 border rounded p-2"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)} // Category filter
        className="ml-2 border rounded p-2"
      />
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)} // Source filter
        className="ml-2 border rounded p-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">Search</button>
    </form>
  );
};

export default SearchBar;
