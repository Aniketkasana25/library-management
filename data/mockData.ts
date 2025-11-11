import { Book } from '../types';

function getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
}

export const initialBooks: Book[] = [
  {
    id: 1,
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    genre: 'Science Fiction',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Fiction',
    borrowedById: 101,
    dueDate: getFutureDate(5),
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 5,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    borrowedById: 201,
    dueDate: getFutureDate(20),
  },
  {
    id: 6,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 7,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    borrowedById: 102,
    dueDate: getFutureDate(-2), // Overdue
  },
  {
    id: 8,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    genre: 'Computer Science',
    borrowedById: 202,
    dueDate: getFutureDate(15),
  },
  {
    id: 9,
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 10,
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    genre: 'Mystery',
    borrowedById: null,
    dueDate: null,
  }
];
