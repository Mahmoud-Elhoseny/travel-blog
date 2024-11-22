import React from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search stories..."
          className="w-full py-2 pl-10 pr-10 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <IoSearch 
          className="absolute left-3 text-gray-400 text-xl" 
          onClick={handleSearch}
        />
        {value && (
          <button
            onClick={onClearSearch}
            className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <IoClose className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
