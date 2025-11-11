import React from 'react';
import { Notification } from '../types';
import { BellIcon } from './icons/BellIcon';

interface NotificationPanelProps {
  notifications: Notification[];
  onClear: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClear }) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-panel-title"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 id="notification-panel-title" className="font-semibold text-gray-800">Overdue Books</h3>
        {notifications.length > 0 && (
            <button
                onClick={onClear}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
            >
                Clear All
            </button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <ul>
            {notifications.map(notification => (
              <li key={notification.id} className="p-4 border-b border-gray-100 last:border-b-0">
                <p className="font-semibold text-gray-800 truncate">{notification.bookTitle}</p>
                <p className="text-sm text-gray-600">Borrowed by: {notification.userName}</p>
                <p className="text-sm font-bold text-red-600 mt-1">
                    {notification.daysOverdue} day{notification.daysOverdue > 1 ? 's' : ''} overdue
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center p-8">
            <BellIcon className="h-10 w-10 mx-auto text-gray-300"/>
            <p className="mt-4 text-sm font-semibold text-gray-600">No new notifications</p>
            <p className="mt-1 text-xs text-gray-500">All books are on time!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;