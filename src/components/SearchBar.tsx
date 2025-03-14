import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  view?: 'albums' | 'artists';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, view = 'albums' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center group">
        <motion.div
          className="absolute -inset-2 bg-purple-500/20 rounded-full blur-xl -z-10"
          animate={{
            scale: isFocused ? 1.1 : 1,
            opacity: isFocused ? 0.8 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />
        <input
          type="text"
          placeholder={`Search for ${view === 'albums' ? 'an album' : 'an artist'}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-6 py-4 pl-14 bg-gray-800/80 backdrop-blur-sm rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-gray-800/90 transition-all duration-300"
        />
        <motion.div
          className="absolute left-5"
          animate={{
            rotate: isFocused ? 360 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Search className="text-gray-400 transition-colors group-hover:text-purple-400" size={20} />
        </motion.div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 px-6 py-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu"
          disabled={!query.trim()}
        >
          Search
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;