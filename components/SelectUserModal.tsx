import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { XIcon } from './icons/XIcon';
import { SearchIcon } from './icons/SearchIcon';

interface SelectUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onSelectUser: (userId: number) => void;
}

const SelectUserModal: React.FC<SelectUserModalProps> = ({ isOpen, onClose, users, onSelectUser }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users;
        return users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toString().includes(searchTerm)
        );
    }, [users, searchTerm]);

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col" style={{height: '70vh'}} role="dialog" aria-modal="true">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Select User to Borrow</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600" aria-label="Close modal">
            <XIcon className="h-6 w-6"/>
          </button>
        </div>
        <div className="p-4 border-b border-gray-200">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
            </div>
        </div>
        <div className="overflow-y-auto flex-grow">
            {filteredUsers.length > 0 ? (
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user.id}>
                            <button 
                                onClick={() => onSelectUser(user.id)}
                                className="w-full text-left px-5 py-3 hover:bg-indigo-50 transition-colors"
                            >
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{user.role} - ID: {user.id}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500 py-8">No users found.</p>
            )}
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
};

export default SelectUserModal;
