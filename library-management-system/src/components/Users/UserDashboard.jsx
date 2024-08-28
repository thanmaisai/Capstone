import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import BooksList from '../Books/BooksList';

const UserDashboard = () => {
    const location = useLocation();
    const { role } = location.state || {}; 

    // Fetch books using Apollo Client's useQuery hook
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Handle book borrowing logic
    const handleBorrow = (bookId) => {
        // Implement the borrow logic here
        console.log('Borrow book with ID:', bookId);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
            <p className="text-center mt-4">Your role: {role}</p>
            <BooksList
                books={data.books}
                role={role}
                onBorrow={handleBorrow}
            />
        </div>
    );
};

export default UserDashboard;
