import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK } from '../../gqloperations/mutations';

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
      refetch(); // Refetch the books after updating (if refetch is defined in your context)
    },
    onError: (error) => console.error("Error updating book:", error),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'available' || name === 'borrowed' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook({ variables: { ...formData } });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Update Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="author">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="image">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="available">
                Available
              </label>
              <input
                type="number"
                id="available"
                name="available"
                value={formData.available}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="borrowed">
                Borrowed
              </label>
              <input
                type="number"
                id="borrowed"
                name="borrowed"
                value={formData.borrowed}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-3 py-2 px-4 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookModal;
