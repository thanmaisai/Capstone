import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import BooksList from '../Books/BooksList';
import SearchBar from '../Search/SearchBar'; 

const UserDashboard = () => {
    const location = useLocation();
    const { role } = location.state || {}; 

    const { loading, error, data } = useQuery(GET_BOOKS);
    const [searchText, setSearchText] = useState(''); 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleBorrow = (bookId) => {
        // The borrow logic here
        console.log('Borrow book with ID:', bookId);
    };

    // Filter books based on search text
    const filteredBooks = data?.books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.category.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center">User Dashboard</h1>
            <p className="text-center mt-4">Your role: {role}</p>
            <div className="my-4">
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSearch={() => {}}
                />
            </div>
            <BooksList
                books={filteredBooks}
                role={role}
                onBorrow={handleBorrow}
            />
        </div>
    );
};

export default UserDashboard;
