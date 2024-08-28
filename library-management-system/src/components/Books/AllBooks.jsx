import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import BooksList from '../Books/BooksList';
import SearchBar from '../Search/SearchBar';

const AllBooks = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [searchText, setSearchText] = useState('');
    const role = localStorage.getItem("role");

    if (role !== 'user') {
        return <p>Unauthorized access</p>;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Filter books based on search text
    const filteredBooks = data?.books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.category.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center">All Books</h1>
            <div className="my-4">
                <SearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    onSearch={() => {}}
                />
            </div>
            <BooksList books={filteredBooks} />
        </div>
    );
};

export default AllBooks;
