import React, { useState, useMemo, useEffect } from 'react';
import { Book, User, Genre, Notification } from './types';
import { initialBooks } from './data/mockData';
import { initialUsers } from './data/mockUserData';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import UserControlPanel from './components/UserControlPanel';
import BookList from './components/BookList';
import UserList from './components/UserList';
import BookFormModal from './components/BookFormModal';
import UserFormModal from './components/UserFormModal';
import SelectUserModal from './components/SelectUserModal';
import UserDetailModal from './components/UserDetailModal';

// Helper to calculate fines, assuming a simple logic
const calculateFine = (dueDate: string): number => {
    const due = new Date(dueDate);
    const today = new Date();
    if (today <= due) return 0;
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * 0.5; // $0.50 per day overdue
};

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentView, setCurrentView] = useState<'books' | 'users'>('books');

  // State for Book view
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState<Genre | 'all'>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'borrowed'>('all');

  // State for User view
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'faculty'>('all');
  const [sortOption, setSortOption] = useState<'name-asc' | 'name-desc' | 'fines-asc' | 'fines-desc'>('name-asc');
  
  // Modal states
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSelectUserOpen, setIsSelectUserOpen] = useState(false);
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  // This effect now only handles generating notifications for currently overdue books.
  // Fines are calculated and permanently added to a user's account upon return.
  useEffect(() => {
    const newNotifications: Notification[] = [];
    books.forEach(book => {
        if (book.borrowedById && book.dueDate) {
            const fine = calculateFine(book.dueDate);
            if (fine > 0) {
                const user = users.find(u => u.id === book.borrowedById);
                if (user) {
                    const daysOverdue = Math.round(fine / 0.5);
                    newNotifications.push({
                        id: book.id,
                        bookTitle: book.title,
                        userName: user.name,
                        daysOverdue,
                    });
                }
            }
        }
    });
    setNotifications(newNotifications);
  }, [books, users]);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Book CRUD and actions
  const handleSaveBook = (bookData: Omit<Book, 'id' | 'borrowedById' | 'dueDate'> & { id?: number }) => {
    if (bookData.id) {
      setBooks(books.map(b => b.id === bookData.id ? { ...b, ...bookData } : b));
    } else {
      const newBook: Book = {
        ...bookData,
        id: Date.now(),
        borrowedById: null,
        dueDate: null,
      };
      setBooks([newBook, ...books]);
    }
  };

  const handleDeleteBook = (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
        setBooks(books.filter(b => b.id !== id));
    }
  };

  const handleBorrowBook = (book: Book) => {
    setBorrowingBook(book);
    setIsSelectUserOpen(true);
  };
  
  const handleSelectUserForBorrow = (userId: number) => {
    if (borrowingBook) {
        const user = users.find(u => u.id === userId);
        const loanDuration = user?.role === 'faculty' ? 30 : 14; // 30 days for faculty, 14 for students
        const today = new Date();
        const dueDate = new Date();
        dueDate.setDate(today.getDate() + loanDuration);

        // Update book status
        setBooks(books.map(b => b.id === borrowingBook.id ? {
            ...b,
            borrowedById: userId,
            dueDate: dueDate.toISOString().split('T')[0],
        } : b));

        // Add to user's borrowing history
        setUsers(users.map(u => u.id === userId ? {
            ...u,
            borrowingHistory: [
                ...u.borrowingHistory,
                {
                    bookId: borrowingBook.id,
                    bookTitle: borrowingBook.title,
                    borrowedDate: today.toISOString().split('T')[0],
                    returnedDate: null
                }
            ]
        } : u));
    }
    setIsSelectUserOpen(false);
    setBorrowingBook(null);
  };

  const handleReturnBook = (book: Book) => {
    const today = new Date().toISOString().split('T')[0];

    // Calculate and apply fine if the book is overdue upon return
    if (book.borrowedById && book.dueDate) {
      const fine = calculateFine(book.dueDate);
      if (fine > 0) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === book.borrowedById
              ? { ...user, fines: user.fines + fine }
              : user
          )
        );
      }
      
      // Update borrowing history with return date
      setUsers(prevUsers => prevUsers.map(user => {
        if (user.id === book.borrowedById) {
            return {
                ...user,
                borrowingHistory: user.borrowingHistory.map(record => 
                    (record.bookId === book.id && record.returnedDate === null)
                        ? { ...record, returnedDate: today }
                        : record
                )
            };
        }
        return user;
      }));
    }

    // Mark the book as returned by clearing borrower info and due date
    setBooks(books.map(b => 
        b.id === book.id 
            ? { ...b, borrowedById: null, dueDate: null } 
            : b
    ));
  };
  
  // User CRUD and actions
   const handleSaveUser = (userData: Omit<User, 'id' | 'fines' | 'borrowingHistory'> & { id?: number }) => {
    if (userData.id) {
        setUsers(users.map(u => u.id === userData.id ? { ...u, ...userData } : u));
    } else {
        const newUser: User = {
            ...userData,
            id: Date.now(),
            fines: 0,
            borrowingHistory: []
        };
        setUsers([newUser, ...users]);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (books.some(b => b.borrowedById === id)) {
        alert("Cannot delete user with borrowed books.");
        return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(users.filter(u => u.id !== id));
    }
  };
  
  const handleViewUserDetails = (user: User) => {
    setViewingUser(user);
    setIsUserDetailOpen(true);
  };

  const handlePayFines = (userId: number) => {
    setUsers(users.map(user => user.id === userId ? { ...user, fines: 0 } : user));
  };


  // Filtering and Sorting Logic
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = genreFilter === 'all' || book.genre === genreFilter;
      const matchesAvailability = availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && book.borrowedById === null) ||
        (availabilityFilter === 'borrowed' && book.borrowedById !== null);
      return matchesSearch && matchesGenre && matchesAvailability;
    });
  }, [books, searchTerm, genreFilter, availabilityFilter]);

  const filteredAndSortedUsers = useMemo(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.id.toString().includes(userSearchTerm);
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    return [...filtered].sort((a, b) => {
        switch(sortOption) {
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'fines-asc': return a.fines - b.fines;
            case 'fines-desc': return b.fines - a.fines;
            case 'name-asc':
            default: return a.name.localeCompare(b.name);
        }
    });
  }, [users, userSearchTerm, roleFilter, sortOption]);

  const openBookForm = (book: Book | null = null) => {
    setEditingBook(book);
    setIsBookFormOpen(true);
  };
  
  const openUserForm = (user: User | null = null) => {
    setEditingUser(user);
    setIsUserFormOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView}
        notifications={notifications}
        onClearNotifications={handleClearNotifications}
      />
      <main className="container mx-auto px-4 md:px-8 py-6">
        {currentView === 'books' ? (
          <>
            <ControlPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              genreFilter={genreFilter}
              onGenreChange={setGenreFilter}
              availabilityFilter={availabilityFilter}
              onAvailabilityChange={setAvailabilityFilter}
              onAddBookClick={() => openBookForm()}
            />
            <BookList
              books={filteredBooks}
              users={users}
              onEdit={openBookForm}
              onDelete={handleDeleteBook}
              onBorrow={handleBorrowBook}
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
              sortOption={sortOption}
              onSortChange={setSortOption}
              onAddUserClick={() => openUserForm()}
            />
            <UserList
                users={filteredAndSortedUsers}
                books={books}
                onEdit={openUserForm}
                onDelete={handleDeleteUser}
                onViewDetails={handleViewUserDetails}
            />
          </>
        )}
      </main>
      
      {isBookFormOpen && (
        <BookFormModal
          isOpen={isBookFormOpen}
          onClose={() => setIsBookFormOpen(false)}
          onSave={handleSaveBook}
          initialData={editingBook}
        />
      )}
      
      {isUserFormOpen && (
        <UserFormModal
            isOpen={isUserFormOpen}
            onClose={() => setIsUserFormOpen(false)}
            onSave={handleSaveUser}
            initialData={editingUser}
        />
      )}
      
      {isSelectUserOpen && (
        <SelectUserModal
            isOpen={isSelectUserOpen}
            onClose={() => setIsSelectUserOpen(false)}
            users={users}
            books={books}
            onSelectUser={handleSelectUserForBorrow}
        />
      )}

      {isUserDetailOpen && viewingUser && (
        <UserDetailModal
            isOpen={isUserDetailOpen}
            onClose={() => setIsUserDetailOpen(false)}
            user={viewingUser}
            books={books}
            onPayFines={handlePayFines}
        />
      )}
    </div>
  );
}

export default App;