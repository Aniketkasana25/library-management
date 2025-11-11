import React, { useState, useRef, useEffect } from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { UsersIcon } from './icons/UsersIcon';
import { BellIcon } from './icons/BellIcon';
import { Notification } from '../types';
import NotificationPanel from './NotificationPanel';


interface HeaderProps {
    currentView: 'books' | 'users';
    onNavigate: (view: 'books' | 'users') => void;
    notifications: Notification[];
    onClearNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, notifications, onClearNotifications }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    
    const navButtonClass = (view: 'books' | 'users') => 
        `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentView === view 
            ? 'bg-indigo-100 text-indigo-700' 
            : 'text-gray-600 hover:bg-gray-100'
        }`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsPanelOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <BookOpenIcon className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight hidden sm:block">
            College Library
            </h1>
        </div>
        
        <div className="flex items-center space-x-2">
            <div ref={panelRef} className="relative">
                <button 
                    onClick={() => setIsPanelOpen(prev => !prev)}
                    className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <BellIcon className="h-6 w-6"/>
                    {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                           {notifications.length}
                        </span>
                    )}
                </button>
                {isPanelOpen && (
                    <NotificationPanel 
                        notifications={notifications} 
                        onClear={onClearNotifications}
                    />
                )}
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
      </div>
    </header>
  );
};

export default Header;