import React from 'react';
import { Book, User } from '../types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  users: User[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, users, onEdit, onDelete, onBorrow, onReturn }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-700">No books found.</h2>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          users={users}
          onEdit={onEdit}
          onDelete={onDelete}
          onBorrow={onBorrow}
          onReturn={onReturn}
        />
      ))}
    </div>
  );
};

export default BookList;
