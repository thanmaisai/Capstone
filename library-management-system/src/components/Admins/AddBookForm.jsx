import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK_MUTATION } from '../../gqloperations/mutations';
import { useTheme } from '@mui/material/styles';

const AddBookModal = React.memo(({ isOpen, onClose, onBookAdded }) => {
  const theme = useTheme();
  const [addBook, { error }] = useMutation(ADD_BOOK_MUTATION);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    image: '',
    available: '',
    borrowed: ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: ['available', 'borrowed'].includes(name) ? Number(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      await addBook({
        variables: { ...formData },
        onCompleted: () => {
          setFormData({
            title: '',
            author: '',
            category: '',
            image: '',
            available: '',
            borrowed: ''
          });
          onClose();
          onBookAdded(); 
        }
      });
    } catch (err) {
      console.error('Error adding book:', err);
    }
  }, [addBook, formData, onClose, onBookAdded]);

  if (!isOpen) return null;

  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    zIndex: 1200,
  };

  const containerStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    zIndex: 1300,
  };

  const labelStyle = {
    color: theme.palette.text.secondary,
  };

  const inputStyle = {
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  };

  const buttonStyles = {
    cancel: {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.text.primary,
    },
    submit: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={modalStyle}>
      <div className="p-4 rounded-lg shadow-lg w-full max-w-3xl" style={containerStyle}>
        <h2 className="text-xl font-bold mb-4" style={labelStyle}>
          Add New Book
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'title', label: 'Title' },
              { id: 'author', label: 'Author' },
              { id: 'category', label: 'Category' },
              { id: 'image', label: 'Image URL' },
              { id: 'available', label: 'Available', type: 'number' },
              { id: 'borrowed', label: 'Borrowed', type: 'number' }
            ].map(({ id, label, type = 'text' }) => (
              <div key={id} className="mb-3">
                <label className="block text-sm font-bold mb-1" htmlFor={id} style={labelStyle}>
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  style={inputStyle}
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-3 py-2 px-4 rounded-lg"
              style={buttonStyles.cancel}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg"
              style={buttonStyles.submit}
            >
              Add Book
            </button>
          </div>
          {error && <p className="text-red-500 mt-4">{error.message}</p>}
        </form>
      </div>
    </div>
  );
});

export default AddBookModal;
