import React from 'react';
import { User, Book } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';

interface UserCardProps {
  user: User;
  books: Book[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onViewDetails: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, books, onEdit, onDelete, onViewDetails }) => {
  const { id, name, role, fines } = user;

  const borrowedCount = books.filter(book => book.borrowedById === id).length;

  const roleClass = role === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(user);
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer"
        onClick={() => onViewDetails(user)}
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 truncate pr-2" title={name}>{name}</h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize flex-shrink-0 ${roleClass}`}>
                {role}
            </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">ID: {id}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex items-center">
                <BookOpenIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>Borrowed Books: <strong>{borrowedCount}</strong></span>
            </div>
            <div className="flex items-center">
                <DollarSignIcon className="h-4 w-4 mr-2 text-gray-500" />
                <span>Outstanding Fines: <strong className={fines > 0 ? 'text-red-600' : ''}>${fines.toFixed(2)}</strong></span>
            </div>
        </div>
      </div>
      
      <div className="p-2 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end items-center">
            <button
                onClick={handleEditClick}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 rounded-md transition-colors"
                aria-label="Edit user"
            >
                <EditIcon className="h-5 w-5" />
            </button>
            <button
                onClick={handleDeleteClick}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 rounded-md transition-colors ml-1"
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