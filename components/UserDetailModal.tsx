import React, { useState } from 'react';
import { User, Book } from '../types';
import { XIcon } from './icons/XIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { HistoryIcon } from './icons/HistoryIcon';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  books: Book[];
  onPayFines: (userId: number) => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ isOpen, onClose, user, books, onPayFines }) => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  
  if (!isOpen || !user) return null;

  const currentlyBorrowedBooks = books.filter(book => book.borrowedById === user.id);
  const borrowingHistory = user.borrowingHistory.slice().reverse(); // Show most recent first

  const tabClass = (tabName: 'current' | 'history') => 
    `px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none ${
        activeTab === tabName 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col" style={{maxHeight: '90vh'}} role="dialog" aria-modal="true">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{user.role} - ID: {user.id}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600" aria-label="Close modal">
            <XIcon className="h-6 w-6"/>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <BookOpenIcon className="h-6 w-6 mr-4 text-indigo-500 flex-shrink-0" />
                    <div>
                        <p className="text-gray-500">Currently Borrowed</p>
                        <p className="font-bold text-lg text-gray-800">{currentlyBorrowedBooks.length}</p>
                    </div>
                </div>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <DollarSignIcon className="h-6 w-6 mr-4 text-red-500 flex-shrink-0" />
                    <div className="flex-grow">
                        <p className="text-gray-500">Outstanding Fines</p>
                        <p className="font-bold text-lg text-red-600">${user.fines.toFixed(2)}</p>
                    </div>
                    {user.fines > 0 && (
                        <button 
                          onClick={() => onPayFines(user.id)}
                          className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                        >
                            Pay Fines
                        </button>
                    )}
                </div>
            </div>

            <div className="border-b border-gray-200 mb-4">
                <div className="bg-gray-100 p-1 rounded-lg inline-flex space-x-1">
                    <button className={tabClass('current')} onClick={() => setActiveTab('current')}>
                        Currently Borrowed
                    </button>
                    <button className={tabClass('history')} onClick={() => setActiveTab('history')}>
                        Borrowing History
                    </button>
                </div>
            </div>

            <div>
                {activeTab === 'current' && (
                    <div>
                        {currentlyBorrowedBooks.length > 0 ? (
                            <ul className="space-y-3">
                                {currentlyBorrowedBooks.map(book => (
                                    <li key={book.id} className="p-3 bg-white border border-gray-200 rounded-md">
                                        <p className="font-semibold text-gray-800">{book.title}</p>
                                        <p className="text-xs text-gray-500">by {book.author}</p>
                                        {book.dueDate && (
                                            <p className="text-xs text-gray-600 mt-1">Due: {new Date(book.dueDate).toLocaleDateString()}</p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 py-6 bg-gray-50 rounded-md">
                                No books currently borrowed.
                            </p>
                        )}
                    </div>
                )}
                 {activeTab === 'history' && (
                    <div>
                        {borrowingHistory.length > 0 ? (
                             <ul className="space-y-3">
                                {borrowingHistory.map((record, index) => (
                                    <li key={`${record.bookId}-${index}`} className="p-3 bg-white border border-gray-200 rounded-md">
                                        <p className="font-semibold text-gray-800">{record.bookTitle}</p>
                                        <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4">
                                            <span>Borrowed: {new Date(record.borrowedDate).toLocaleDateString()}</span>
                                            <span>
                                                Returned: {record.returnedDate 
                                                    ? new Date(record.returnedDate).toLocaleDateString() 
                                                    : <span className="font-semibold text-blue-600">Not Returned</span>}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500 py-6 bg-gray-50 rounded-md">
                                No borrowing history found.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end rounded-b-lg border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white border border-transparent rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
      </div>
    </div>
  );
};

export default UserDetailModal;