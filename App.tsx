import React, { useState, useMemo, useCallback } from 'react';
import { Book, Genre, User } from './types';
import { initialBooks } from './data/mockData';
import { initialUsers } from './data/mockUserData';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import BookList from './components/BookList';
import BookFormModal from './components/BookFormModal';
import UserControlPanel from './components/UserControlPanel';
import UserList from './components/UserList';
import UserFormModal from './components/UserFormModal';
import SelectUserModal from './components/SelectUserModal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [view, setView] = useState<'books' | 'users'>('books');

  // Book state
  const [bookSearchTerm, setBookSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState<Genre | 'all'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'borrowed'>('all');
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // User state
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'faculty'>('all');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Borrowing state
  const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState(false);
  const [bookToBorrow, setBookToBorrow] = useState<Book | null>(null);

  // Book Management
  const handleAddBook = (book: Omit<Book, 'id' | 'borrowedById' | 'dueDate'>) => {
    setBooks(prev => [...prev, { ...book, id: Date.now(), borrowedById: null, dueDate: null }]);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const handleDeleteBook = (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
        setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  // User Management
  const handleAddUser = (user: Omit<User, 'id' | 'fines'>) => {
    setUsers(prev => [...prev, { ...user, id: Date.now(), fines: 0 }]);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleDeleteUser = (id: number) => {
     if (books.some(b => b.borrowedById === id)) {
        alert("Cannot delete user. They have books currently borrowed.");
        return;
      }
    if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  // Borrowing and Returning
  const handleInitiateBorrow = (book: Book) => {
    setBookToBorrow(book);
    setIsSelectUserModalOpen(true);
  };

  const handleConfirmBorrow = (userId: number) => {
    if (!bookToBorrow) return;
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const borrowedCount = books.filter(b => b.borrowedById === userId).length;
    const limit = user.role === 'faculty' ? 10 : 5;

    if (borrowedCount >= limit) {
      alert(`${user.name} has reached their borrowing limit of ${limit} books.`);
      return;
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (user.role === 'faculty' ? 30 : 14));

    setBooks(books.map(b => b.id === bookToBorrow.id ? { ...b, borrowedById: userId, dueDate: dueDate.toISOString().split('T')[0] } : b));
    setIsSelectUserModalOpen(false);
    setBookToBorrow(null);
  };

  const handleReturnBook = (book: Book) => {
    if (!book.borrowedById || !book.dueDate) return;
    
    let fineIncurred = 0;
    const today = new Date();
    const dueDate = new Date(book.dueDate);
    today.setHours(0,0,0,0);
    
    if (today > dueDate) {
        const daysOverdue = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
        fineIncurred = daysOverdue * 0.50; // $0.50 per day
    }

    if (fineIncurred > 0) {
        setUsers(users.map(u => u.id === book.borrowedById ? { ...u, fines: u.fines + fineIncurred } : u));
        alert(`Book is overdue. A fine of $${fineIncurred.toFixed(2)} has been added.`);
    }

    setBooks(books.map(b => b.id === book.id ? { ...b, borrowedById: null, dueDate: null } : b));
  };


  // Modals
  const openAddBookModal = () => { setEditingBook(null); setIsBookModalOpen(true); };
  const openEditBookModal = (book: Book) => { setEditingBook(book); setIsBookModalOpen(true); };
  const closeBookModal = useCallback(() => { setIsBookModalOpen(false); setEditingBook(null); }, []);

  const openAddUserModal = () => { setEditingUser(null); setIsUserModalOpen(true); };
  const openEditUserModal = (user: User) => { setEditingUser(user); setIsUserModalOpen(true); };
  const closeUserModal = useCallback(() => { setIsUserModalOpen(false); setEditingUser(null); }, []);

  // Filtering
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(bookSearchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(bookSearchTerm.toLowerCase());
      const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && book.borrowedById === null) ||
        (availabilityFilter === 'borrowed' && book.borrowedById !== null);
      
      return matchesSearch && matchesGenre && matchesAvailability;
    });
  }, [books, bookSearchTerm, genreFilter, availabilityFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
        const matchesSearch = 
            user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
            user.id.toString().includes(userSearchTerm);
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });
  }, [users, userSearchTerm, roleFilter]);


  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header currentView={view} onNavigate={setView} />
      <main className="container mx-auto p-4 md:p-8">
        {view === 'books' ? (
          <>
            <ControlPanel
              searchTerm={bookSearchTerm}
              onSearchChange={setBookSearchTerm}
              genreFilter={genreFilter}
              onGenreChange={setGenreFilter}
              availabilityFilter={availabilityFilter}
              onAvailabilityChange={setAvailabilityFilter}
              onAddBookClick={openAddBookModal}
            />
            <BookList
              books={filteredBooks}
              users={users}
              onEdit={openEditBookModal}
              onDelete={handleDeleteBook}
              onBorrow={handleInitiateBorrow}
              onReturn={handleReturnBook}
            />
          </>
        ) : (
          <>
            <UserControlPanel
              searchTerm={userSearchTerm}
              onSearchChange={setUserSearchTerm}
              roleFilter={roleFilter}
              onRoleChange={setRoleFilter}
              onAddUserClick={openAddUserModal}
            />
            <UserList
                users={filteredUsers}
                books={books}
                onEdit={openEditUserModal}
                onDelete={handleDeleteUser}
            />
          </>
        )}
        
        {isBookModalOpen && (
          <BookFormModal
            isOpen={isBookModalOpen}
            onClose={closeBookModal}
            onSave={editingBook ? handleUpdateBook : handleAddBook}
            initialData={editingBook}
          />
        )}
        {isUserModalOpen && (
          <UserFormModal
            isOpen={isUserModalOpen}
            onClose={closeUserModal}
            onSave={editingUser ? handleUpdateUser : handleAddBook}
            initialData={editingUser}
          />
        )}
        {isSelectUserModalOpen && (
            <SelectUserModal
                isOpen={isSelectUserModalOpen}
                onClose={() => setIsSelectUserModalOpen(false)}
                users={users}
                books={books}
                onSelectUser={handleConfirmBorrow}
            />
        )}

      </main>
      <button
          onClick={view === 'books' ? openAddBookModal : openAddUserModal}
          className="md:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-110"
          aria-label={view === 'books' ? 'Add new book' : 'Add new user'}
      >
          <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default App;