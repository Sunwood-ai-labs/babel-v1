
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, t }) => (
  <div className="relative w-full md:w-auto">
    <input
      type="text"
      placeholder={t('saas.list.search')}
      className="w-full md:w-64 pl-10 pr-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <Search className="absolute left-3 top-2.5 text-indigo-400" size={20} />
  </div>
);

export default SearchBar;
