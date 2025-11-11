import React from 'react';
import { Genre } from '../types';
import { GENRES } from '../constants';
import { SearchIcon } from './icons/SearchIcon';
import { PlusIcon } from './icons/PlusIcon';

interface ControlPanelProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  genreFilter: Genre | 'all';
  onGenreChange: (genre: Genre | 'all') => void;
  availabilityFilter: 'all' | 'available' | 'borrowed';
  onAvailabilityChange: (status: 'all' | 'available' | 'borrowed') => void;
  onAddBookClick: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  searchTerm,
  onSearchChange,
  genreFilter,
  onGenreChange,
  availabilityFilter,
  onAvailabilityChange,
  onAddBookClick,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 md:mb-8 sticky top-20 z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative lg:col-span-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <select
          value={genreFilter}
          onChange={(e) => onGenreChange(e.target.value as Genre | 'all')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
        >
          <option value="all">All Genres</option>
          {GENRES.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        
        <select
          value={availabilityFilter}
          onChange={(e) => onAvailabilityChange(e.target.value as 'all' | 'available' | 'borrowed')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
        >
          <option value="all">All Statuses</option>
          <option value="available">Available</option>
          <option value="borrowed">Borrowed</option>
        </select>
      </div>
      <div className="mt-4 hidden md:flex justify-end">
          <button
              onClick={onAddBookClick}
              className="flex items-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Book
          </button>
      </div>
    </div>
  );
};

export default ControlPanel;
