import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK } from '../gqloperations/mutations';

const UpdateBookModal = ({ isOpen, onClose, book }) => {
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    author: '',
    category: '',
    image: '',
    available: 0,
    borrowed: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      onClose();
      refetch(); // Refetch the books after updating
    },
    onError: (error) => console.error("Error updating book:", error),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook({ variables: { ...formData } });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="text-xl font-semibold mb-4">Update Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Available"
            value={formData.available}
            onChange={(e) => setFormData({ ...formData, available: parseInt(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Borrowed"
            value={formData.borrowed}
            onChange={(e) => setFormData({ ...formData, borrowed: parseInt(e.target.value) })}
            required
          />
          <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Update Book
          </button>
        </form>
        <button onClick={onClose} className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateBookModal;
