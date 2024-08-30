import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import AddBookModal from '../Admins/AddBookForm';
import UpdateBookModal from '../Users/UpdateBookForm';
import BooksList from '../Books/BooksList';
import SearchBar from '../Search/SearchBar';
import { GET_BOOKS, DELETE_BOOK, BORROW_BOOK } from '../../gqloperations/mutations';

const ManageBooks = () => {
  const { data, loading, error, refetch } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => refetch(),
    onError: (error) => console.error("Error deleting book:", error),
  });
  const [borrowBook] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleDelete = async (bookId) => {
    try {
      await deleteBook({ variables: { _id: bookId } });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdate = (book) => {
    setSelectedBook(book);
    setUpdateModalOpen(true);
  };

  const handleBorrow = async (bookId) => {
    try {
      await borrowBook({ variables: { _id: bookId } });
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  const filteredBooks = data?.books.filter(book =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleBookAdded = () => {
    refetch(); // Refetch books after adding a new book
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books: {error.message}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
      >
        Add New Book
      </button>
      <AddBookModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onBookAdded={handleBookAdded} />
      <UpdateBookModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        book={selectedBook}
        refetch={refetch} // Pass refetch function
      />
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSearch={() => {}}
      />
      <div className="mt-8">
        <BooksList
          books={filteredBooks}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          role="admin"
          onBorrow={handleBorrow}
        />
      </div>
    </div>
  );
};

export default ManageBooks;