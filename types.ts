import { GENRES } from './constants';

export type Genre = typeof GENRES[number];

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  coverUrl?: string;
  borrowedById: number | null;
  dueDate: string | null;
}

export interface User {
  id: number;
  name: string;
  role: 'student' | 'faculty';
  fines: number;
}

export interface Notification {
  id: number; // Corresponds to book ID
  bookTitle: string;
  userName: string;
  daysOverdue: number;
}