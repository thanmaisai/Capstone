import React from 'react';
import { useMutation } from '@apollo/client';
import { BORROW_BOOK, GET_BOOKS } from '../../gqloperations/mutations';
import { useUser } from '../UserContext';
import { IconButton, useTheme, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit';
import BorrowIcon from '@mui/icons-material/LibraryBooks';
import LensIcon from '@mui/icons-material/Lens';

const BooksList = ({ books, role, onDelete, onUpdate }) => {
  const { user, borrowBook } = useUser();
  const [borrowBookMutation] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const theme = useTheme();

  const handleBorrow = async (bookId) => {
    try {
      await borrowBookMutation({ variables: { _id: bookId } });
      borrowBook(bookId);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const borrowedBooks = user?.borrowedBooks || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.length === 0 ? (
        <p className="text-center text-lg">No books available</p>
      ) : (
        books.map((book) => (
          <div
            key={book._id}
            className="relative rounded-lg shadow-lg overflow-hidden"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              marginBottom: '20px', 
            }}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-60 object-cover" 
              style={{ marginBottom: '16px', border:'none' }} />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <div className="mt-2">
                <p className="text-sm">
                  Author: <span className="font-medium">{book.author}</span>
                </p>
                <p className="text-sm">
                  Category: <span className="font-medium">{book.category}</span>
                </p>
                <p className="text-sm">
                  Available: <span className="font-medium">{book.available}</span>
                </p>
                <p className="text-sm">
                  Borrowed: <span className="font-medium">{book.borrowed}</span>
                </p>
              </div>
              <Divider sx={{ my: 1 }} /> 
              <div className="flex space-x-2 mt-4">
                {role === 'admin' ? (
                  <>
                    <IconButton
                      onClick={() => onDelete(book._id)}
                      className="p-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onUpdate(book)}
                      className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      aria-label="update"
                    >
                      <UpdateIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => handleBorrow(book._id)}
                    className={`p-2 transition-colors ${
                      borrowedBooks.includes(book._id)
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    disabled={borrowedBooks.includes(book._id) || book.available === 0}
                    aria-label="borrow"
                  >
                    <BorrowIcon />
                  </IconButton>
                )}
              </div>
              <div
                className={`absolute bottom-4 right-14 px-2 py-1 text-xs font-semibold rounded-md ${
                  borrowedBooks.includes(book._id) ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}
                style={{ transform: 'translateX(50%)', display: 'flex', alignItems: 'center' }}
              >
                <LensIcon sx={{ fontSize: 'small', marginRight: 0.5 }} />
                {borrowedBooks.includes(book._id) ? 'Borrowed' : 'Available'}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BooksList;
