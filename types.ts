import { GENRES } from './constants';

export type Genre = typeof GENRES[number];

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  borrowedById: number | null;
  dueDate: string | null;
}

export interface User {
  id: number;
  name: string;
  role: 'student' | 'faculty';
  fines: number;
}
