import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  view?: 'albums' | 'artists';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, view = 'albums' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={`Search for ${view === 'albums' ? 'an album' : 'an artist'}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-4 text-gray-400" size={20} />
        <button
          type="submit"
          className="absolute right-2 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;