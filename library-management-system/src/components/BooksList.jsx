import React from 'react';
import BookCard from './BookCard';

const BooksList = ({ books, onDelete }) => (
  <div className="flex flex-wrap">
    {books.map(book => (
      <div key={book._id} className="relative">
        <BookCard book={book} />
        <button
          onClick={() => onDelete(book._id)}
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default BooksList;