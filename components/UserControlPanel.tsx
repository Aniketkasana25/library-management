import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { PlusIcon } from './icons/PlusIcon';
import { User } from '../types';

interface UserControlPanelProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  roleFilter: 'all' | 'student' | 'faculty';
  onRoleChange: (role: 'all' | 'student' | 'faculty') => void;
  sortOption: 'name-asc' | 'name-desc' | 'fines-asc' | 'fines-desc';
  onSortChange: (option: 'name-asc' | 'name-desc' | 'fines-asc' | 'fines-desc') => void;
  onAddUserClick: () => void;
}

const UserControlPanel: React.FC<UserControlPanelProps> = ({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleChange,
  sortOption,
  onSortChange,
  onAddUserClick,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 md:mb-8 sticky top-20 z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <select
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value as 'all' | 'student' | 'faculty')}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
        >
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
          <option value="fines-asc">Sort by Fines (Low to High)</option>
          <option value="fines-desc">Sort by Fines (High to Low)</option>
        </select>
      </div>
      <div className="mt-4 hidden md:flex justify-end">
          <button
              onClick={onAddUserClick}
              className="flex items-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New User
          </button>
      </div>
    </div>
  );
};

export default UserControlPanel;