import React, { useState, useEffect, memo, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK } from '../../gqloperations/mutations';
import { useTheme } from '@mui/material/styles';

const UpdateBookModal = memo(({ isOpen, onClose, book, refetch }) => {
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
      if (refetch) refetch();
    },
    onError: (error) => console.error("Error updating book:", error),
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'available' || name === 'borrowed' ? Number(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    updateBook({ variables: { ...formData } });
  }, [formData, updateBook]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: 1200,
      }}
    >
      <div
        className="p-4 rounded-lg shadow-lg w-full max-w-3xl"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          zIndex: 1300,
        }}
      >
        <h2 className="text-xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
          Update Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {['title', 'author', 'category', 'image'].map(field => (
              <div className="mb-3" key={field}>
                <label
                  className="block text-sm font-bold mb-1"
                  htmlFor={field}
                  style={{ color: theme.palette.text.secondary }}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
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
            ))}
            {['available', 'borrowed'].map(field => (
              <div className="mb-3" key={field}>
                <label
                  className="block text-sm font-bold mb-1"
                  htmlFor={field}
                  style={{ color: theme.palette.text.secondary }}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="number"
                  id={field}
                  name={field}
                  value={formData[field]}
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
            ))}
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
});

export default UpdateBookModal;
