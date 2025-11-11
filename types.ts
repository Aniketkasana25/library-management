import { GENRES } from './constants';

export type Genre = typeof GENRES[number];

export interface BorrowingRecord {
  bookId: number;
  bookTitle: string;
  borrowedDate: string;
  returnedDate: string | null;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  coverUrl: string | null;
  borrowedById: number | null;
  dueDate: string | null;
}

export interface User {
  id: number;
  name: string;
  role: 'student' | 'faculty';
  fines: number;
  borrowingHistory: BorrowingRecord[];
}

export interface Notification {
  id: number;
  bookTitle: string;
  userName: string;
  daysOverdue: number;
}