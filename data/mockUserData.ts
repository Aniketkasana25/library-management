import { User } from '../types';

export const initialUsers: User[] = [
    {
        id: 101,
        name: 'Alice Johnson',
        role: 'student',
        fines: 0,
    },
    {
        id: 102,
        name: 'Bob Williams',
        role: 'student',
        fines: 5.50,
    },
    {
        id: 103,
        name: 'Charlie Brown',
        role: 'student',
        fines: 0,
    },
    {
        id: 201,
        name: 'Prof. Diana Miller',
        role: 'faculty',
        fines: 0,
    },
    {
        id: 202,
        name: 'Dr. Edward Davis',
        role: 'faculty',
        fines: 12.00,
    }
];
