import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, filters: { date?: string; category?: string; source?: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, { date, category, source });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center space-x-2">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded p-2 w-1/2"
      />

      {/* Date filter */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border rounded p-2"
      />

      {/* Category filter */}
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2"
      />

      {/* Source filter */}
      <input
        type="text"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="border rounded p-2"
      />

      {/* Submit button */}
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
