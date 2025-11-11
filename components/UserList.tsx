
import React from 'react';
import { User, Book } from '../types';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  books: Book[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onViewDetails: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, books, onEdit, onDelete, onViewDetails }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-700">No users found.</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          books={books}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default UserList;
