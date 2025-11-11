import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { UsersIcon } from './icons/UsersIcon';

interface HeaderProps {
    currentView: 'books' | 'users';
    onNavigate: (view: 'books' | 'users') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
    const navButtonClass = (view: 'books' | 'users') => 
        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentView === view 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`;

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <BookOpenIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight hidden sm:block">
            College Library
            </h1>
        </div>
        
        <div className="bg-gray-200 p-1 rounded-lg flex space-x-1">
            <button className={navButtonClass('books')} onClick={() => onNavigate('books')}>
                <BookOpenIcon className="h-5 w-5 mr-2" />
                Books
            </button>
            <button className={navButtonClass('users')} onClick={() => onNavigate('users')}>
                <UsersIcon className="h-5 w-5 mr-2" />
                Users
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
