import { User } from '../types';

export const initialUsers: User[] = [
  {
    id: 101,
    name: 'Alice Johnson',
    role: 'student',
    fines: 0,
    borrowingHistory: [
      { bookId: 2, bookTitle: 'Pride and Prejudice', borrowedDate: '2024-07-15', returnedDate: null },
      { bookId: 4, bookTitle: '1984', borrowedDate: '2024-06-01', returnedDate: '2024-06-14' },
    ],
  },
  {
    id: 102,
    name: 'Bob Williams',
    role: 'student',
    fines: 5.50,
    borrowingHistory: [
        { bookId: 7, bookTitle: 'Sapiens: A Brief History of Humankind', borrowedDate: '2024-07-20', returnedDate: null },
    ],
  },
  {
    id: 201,
    name: 'Prof. Charlie Brown',
    role: 'faculty',
    fines: 0,
    borrowingHistory: [
        { bookId: 5, bookTitle: 'The Lord of the Rings', borrowedDate: '2024-07-01', returnedDate: null },
    ],
  },
  {
    id: 202,
    name: 'Dr. Diana Miller',
    role: 'faculty',
    fines: 12.00,
    borrowingHistory: [
      { bookId: 8, bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship', borrowedDate: '2024-06-25', returnedDate: null },
      { bookId: 10, bookTitle: 'And Then There Were None', borrowedDate: '2024-05-10', returnedDate: '2024-06-05' },
    ],
  },
  {
    id: 103,
    name: 'Eve Davis',
    role: 'student',
    fines: 0,
    borrowingHistory: [],
  },
];