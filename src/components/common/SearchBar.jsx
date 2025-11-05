import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Codeforces username (e.g., tourist)"
          className="w-full px-6 py-4 pr-14 rounded-xl bg-white/95 backdrop-blur-sm text-gray-800 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg hover:scale-105 transition-transform"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
