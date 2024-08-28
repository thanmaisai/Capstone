import React from 'react';

const BookCard = ({ book }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-2">
    <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-t-lg" />
    <div className="mt-2">
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-700">Author: {book.author}</p>
      <p className="text-gray-500">Category: {book.category}</p>
      <p className="text-gray-500">Available: {book.available}</p>
      <p className="text-gray-500">Borrowed: {book.borrowed}</p>
    </div>
  </div>
);

export default BookCard;
