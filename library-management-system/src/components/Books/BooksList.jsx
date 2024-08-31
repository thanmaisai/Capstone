import React from 'react';
import { useMutation } from '@apollo/client';
import { BORROW_BOOK, GET_BOOKS } from '../../gqloperations/mutations';
import { useUser } from '../UserContext';
import { IconButton, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Edit';
import AuthorIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import AvailableIcon from '@mui/icons-material/CheckCircle';
import BorrowedIcon from '@mui/icons-material/Cancel';
import BorrowIcon from '@mui/icons-material/LibraryBooks';

const BooksList = ({ books, role, onDelete, onUpdate }) => {
  const { user, borrowBook } = useUser();
  const [borrowBookMutation] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const theme = useTheme();

  const handleBorrow = async (bookId) => {
    try {
      const { data } = await borrowBookMutation({ variables: { _id: bookId } });
      borrowBook(bookId);
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const borrowedBooks = user?.borrowedBooks || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.length === 0 ? (
        <p className="text-center text-lg">
          No books available
        </p>
      ) : (
        books.map((book) => (
          <div
            key={book._id}
            className="rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              '--tw-shadow': theme.shadows[1],
            }}
          >
            <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{book.title}</h2>
              <div className="flex items-center mt-2">
                <AuthorIcon className="mr-2" />
                <span>Author: <span className="font-medium">{book.author}</span></span>
              </div>
              <div className="flex items-center mt-2">
                <CategoryIcon className="mr-2" />
                <span>Category: <span className="font-medium">{book.category}</span></span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <AvailableIcon className="mr-2" style={{ color: theme.palette.success.main }} />
                  <span>Available: <span className="font-semibold" style={{ color: theme.palette.success.main }}>{book.available}</span></span>
                </div>
                <div className="flex items-center">
                  <BorrowedIcon className="mr-2" style={{ color: theme.palette.error.main }} />
                  <span>Borrowed: <span className="font-semibold" style={{ color: theme.palette.error.main }}>{book.borrowed}</span></span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                {role === 'admin' ? (
                  <>
                    <IconButton
                      onClick={() => onDelete(book._id)}
                      style={{ backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText }}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onUpdate(book)}
                      style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                      aria-label="update"
                    >
                      <UpdateIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={() => handleBorrow(book._id)}
                    className={`transition-colors ${
                      borrowedBooks.includes(book._id)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : `bg-green-500 text-white hover:bg-green-600`
                    }`}
                    disabled={borrowedBooks.includes(book._id)}
                    aria-label="borrow"
                  >
                    <BorrowIcon />
                  </IconButton>
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