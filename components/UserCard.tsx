import React from 'react';
import { User, Book } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { User as UserIcon } from 'react-feather';

interface UserCardProps {
  user: User;
  books: Book[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, books, onEdit, onDelete }) => {
  const { id, name, role, fines } = user;

  const borrowedCount = books.filter(book => book.borrowedById === id).length;

  const roleClass = role === 'faculty' 
    ? 'bg-purple-100 text-purple-800'
    : 'bg-blue-100 text-blue-800';
    
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${roleClass} capitalize`}>
                {role}
            </span>
            <span className="text-sm text-gray-400">ID: {id}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mt-2 truncate" title={name}>{name}</h3>
        <div className="mt-3 space-y-2 text-sm text-gray-600">
            <p><strong>Books Borrowed:</strong> {borrowedCount}</p>
            <p><strong>Outstanding Fines:</strong> <span className={fines > 0 ? "font-bold text-red-600" : ""}>${fines.toFixed(2)}</span></p>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end items-center">
            <button
                onClick={() => onEdit(user)}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Edit user"
            >
                <EditIcon className="h-5 w-5" />
            </button>
            <button
                onClick={() => onDelete(id)}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors ml-1"
                aria-label="Delete user"
            >
                <TrashIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
