import React, { useState, useEffect } from 'react';
import { Book, User } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ClockIcon } from './icons/ClockIcon';
import { BookIcon } from './icons/BookIcon';
import { formatDueDate } from '../utils/dateUtils';

interface BookCardProps {
  book: Book;
  users: User[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, users, onEdit, onDelete, onBorrow, onReturn }) => {
  const { id, title, author, genre, coverUrl, borrowedById, dueDate } = book;

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [coverUrl]);

  const isAvailable = borrowedById === null;
  
  const availabilityClass = isAvailable
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800';

  const borrower = !isAvailable ? users.find(u => u.id === borrowedById) : null;
  const dueDateInfo = formatDueDate(dueDate);

  const handleActionClick = () => {
    if (isAvailable) {
        onBorrow(book);
    } else {
        onReturn(book);
    }
  }

  const toggleButtonClass = isAvailable
    ? 'bg-blue-500 hover:bg-blue-600'
    : 'bg-green-500 hover:bg-green-600';
    
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[3/4] bg-gray-200">
        {(coverUrl && !imageError) ? (
            <img
                src={coverUrl}
                alt={`Cover of ${title}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <BookIcon className="w-16 h-16 text-gray-300" />
            </div>
        )}
      </div>
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <p className="text-sm font-medium text-indigo-600">{genre}</p>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${availabilityClass}`}>
            {isAvailable ? 'Available' : 'Borrowed'}
            </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mt-2 truncate" title={title}>{title}</h3>
        <p className="text-sm text-gray-500 mt-1">by {author}</p>

        {!isAvailable && borrower && (
            <div className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg space-y-2">
                <div>
                    <strong>Borrowed by:</strong> {borrower.name}
                </div>
                <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span className={dueDateInfo.className}>{dueDateInfo.text}</span>
                </div>
            </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
            <button
                onClick={handleActionClick}
                className={`w-full mr-2 text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm ${toggleButtonClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50 ${isAvailable ? 'focus:ring-blue-500' : 'focus:ring-green-500'}`}
            >
                {isAvailable ? 'Borrow' : 'Return'}
            </button>
            <div className="flex">
                <button
                    onClick={() => onEdit(book)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Edit book"
                >
                    <EditIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDelete(id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors ml-1"
                    aria-label="Delete book"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;