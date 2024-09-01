/* The above code is a React component called `UpdateBookModal` that serves as a modal for updating
book information. Here is a breakdown of what the code is doing: */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK } from '../../gqloperations/mutations';
import { useTheme } from '@mui/material/styles';

const UpdateBookModal = ({ isOpen, onClose, book, refetch }) => {
  const theme = useTheme();
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
      if (refetch) refetch(); // Refetch the books after updating
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
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
        backdropFilter: 'blur(5px)', // Adds a blur effect to the background
        zIndex: 1200, // Ensure this is lower than the modal content
      }}
    >
      <div
        className="p-4 rounded-lg shadow-lg w-full max-w-3xl"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          zIndex: 1300, // Ensure this is higher than the background overlay
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
          Update Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="title"
                style={{ color: theme.palette.text.secondary }}
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  borderColor: theme.palette.divider,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="author"
                style={{ color: theme.palette.text.secondary }}
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  borderColor: theme.palette.divider,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="category"
                style={{ color: theme.palette.text.secondary }}
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  borderColor: theme.palette.divider,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="image"
                style={{ color: theme.palette.text.secondary }}
              >
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  borderColor: theme.palette.divider,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="available"
                style={{ color: theme.palette.text.secondary }}
              >
                Available
              </label>
              <input
                type="number"
                id="available"
                name="available"
                value={formData.available}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  borderColor: theme.palette.divider,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label
                className="block text-sm font-bold mb-1"
                htmlFor="borrowed"
                style={{ color: theme.palette.text.secondary }}
              >
                Borrowed
              </label>
              <input
                type="number"
                id="borrowed"
                name="borrowed"
                value={formData.borrowed}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                style={{
                  borderColor: theme.palette.divider,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-3 py-2 px-4 rounded-lg"
              style={{
                backgroundColor: theme.palette.action.disabledBackground,
                color: theme.palette.text.primary,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg"
              style={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                border: 'none',
                cursor: 'pointer',
              }}
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