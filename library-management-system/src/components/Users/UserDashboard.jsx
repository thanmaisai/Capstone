import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';

const UserDashboard = () => {
    const { user } = useUser();
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const { data, loading, error } = useQuery(GET_BOOKS);

    useEffect(() => {
        if (data && user && Array.isArray(user.borrowedBooks)) {
            const borrowedBookIds = new Set(user.borrowedBooks.map(book => book._id)); // Ensure this is an array of IDs
            const filteredBorrowedBooks = data.books.filter(book => borrowedBookIds.has(book._id));
            setBorrowedBooks(filteredBorrowedBooks);
        }
    }, [data, user]);

    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error fetching books: {error.message}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">User Dashboard</h1>
                <p className="text-center text-gray-600 mt-2">Your role: {user?.role}</p>

                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
                    <p className="mt-2 text-gray-600">Total books borrowed: <span className="font-bold text-blue-600">{borrowedBooks.length}</span></p>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Borrowed Books</h2>
                    {borrowedBooks.length > 0 ? (
                        <ul className="space-y-4">
                            {borrowedBooks.map(book => (
                                <li key={book._id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
                                    <img 
                                        src={book.image} 
                                        alt={book.title} 
                                        className="w-24 h-36 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-gray-800">{book.title}</h3>
                                        <p className="text-gray-600">Author: {book.author}</p>
                                        <p className="text-gray-600">Category: {book.category}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-600">No borrowed books</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
