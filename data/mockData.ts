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
    coverUrl: 'https://images.unsplash.com/photo-1551351298-1a4a44546415?q=80&w=300',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1623359223385-e23a40c30985?q=80&w=300',
    borrowedById: 101,
    dueDate: getFutureDate(5),
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    coverUrl: null,
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 5,
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    coverUrl: 'https://images.unsplash.com/photo-1509607979298-154952079142?q=80&w=300',
    borrowedById: 201,
    dueDate: getFutureDate(20),
  },
  {
    id: 6,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1578877013234-14878a8b8577?q=80&w=300',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 7,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    genre: 'Non-Fiction',
    coverUrl: null,
    borrowedById: 102,
    dueDate: getFutureDate(-2), // Overdue
  },
  {
    id: 8,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    genre: 'Computer Science',
    coverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=300',
    borrowedById: 202,
    dueDate: getFutureDate(15),
  },
  {
    id: 9,
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    coverUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256ec346?q=80&w=300',
    borrowedById: null,
    dueDate: null,
  },
  {
    id: 10,
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    genre: 'Mystery',
    coverUrl: 'https://images.unsplash.com/photo-1518999823338-34b7522a9751?q=80&w=300',
    borrowedById: null,
    dueDate: null,
  }
];