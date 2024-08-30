import React from 'react';
import { useMutation } from '@apollo/client';
import { BORROW_BOOK, GET_BOOKS } from '../../gqloperations/mutations';
import { useUser } from '../UserContext';

const BooksList = ({ books, role, onDelete, onUpdate }) => {
  const { user, borrowBook } = useUser(); // Get user and borrowBook function from context
  const [borrowBookMutation] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleBorrow = async (bookId) => {
    try {
      console.log('Attempting to borrow book with ID:', bookId);

      const { data } = await borrowBookMutation({ variables: { _id: bookId } });
      console.log('Borrow Book Mutation Response:', data);

      // Update context with borrowed book ID
      borrowBook(bookId);

      console.log('Book borrowed successfully:', data.borrowBook);
      
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  // Ensure user and borrowedBooks are defined
  const borrowedBooks = user?.borrowedBooks || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">No books available</p>
      ) : (
        books.map((book) => (
          <div key={book._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
            <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600 mt-2">Author: <span className="font-medium">{book.author}</span></p>
              <p className="text-gray-600 mt-1">Category: <span className="font-medium">{book.category}</span></p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">Available: <span className="font-semibold text-green-600">{book.available}</span></p>
                <p className="text-gray-600">Borrowed: <span className="font-semibold text-red-600">{book.borrowed}</span></p>
              </div>
              <div className="flex space-x-2 mt-4">
                {role === 'admin' ? (
                  <>
                    <button
                      onClick={() => onDelete(book._id)}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => onUpdate(book)}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleBorrow(book._id)}
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${
                      borrowedBooks.includes(book._id)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    disabled={borrowedBooks.includes(book._id)}
                  >
                    {borrowedBooks.includes(book._id) ? 'Borrowed' : 'Borrow'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BooksList;