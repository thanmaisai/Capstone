import React, { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Box, Button, CircularProgress, Alert, useTheme, Typography } from '@mui/material';
import AddBookModal from '../Admins/AddBookForm';
import UpdateBookModal from '../Users/UpdateBookForm';
import BooksList from '../Books/BooksList';
import SearchBar from '../Search/SearchBar';
import { GET_BOOKS, DELETE_BOOK, BORROW_BOOK } from '../../gqloperations/mutations';

const ManageBooks = () => {
  const theme = useTheme();
  const { data, loading, error, refetch } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: refetch,
    onError: (error) => console.error("Error deleting book:", error),
  });
  const [borrowBook] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleDelete = useCallback(async (bookId) => {
    try {
      await deleteBook({ variables: { _id: bookId } });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }, [deleteBook]);

  const handleUpdate = useCallback((book) => {
    setSelectedBook(book);
    setUpdateModalOpen(true);
  }, []);

  const handleBorrow = useCallback(async (bookId) => {
    try {
      await borrowBook({ variables: { _id: bookId } });
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  }, [borrowBook]);

  const filteredBooks = useMemo(() => {
    return data?.books.filter(book =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.category.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const handleBookAdded = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: 3,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Manage Books
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1200,
          mb: 2,
        }}
      >
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={() => {}}
          sx={{ width: '100%', maxWidth: 600, mb: 2 }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            width: '100%',
            maxWidth: 600,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{
              flex: 1,
              borderRadius: 4,
              padding: '8px 16px',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Add New Book
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setSearchText('')}
            sx={{
              flex: 1,
              borderRadius: 4,
              padding: '8px 16px',
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Clear Search
          </Button>
        </Box>
      </Box>
      <AddBookModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onBookAdded={handleBookAdded} />
      <UpdateBookModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        book={selectedBook}
        refetch={refetch}
      />
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 1,
          p: 2,
          boxShadow: 2,
          width: '100%',
          maxWidth: 1500,
          mt: 2,
        }}
      >
        <BooksList
          books={filteredBooks}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          role="admin"
          onBorrow={handleBorrow}
        />
      </Box>
    </Box>
  );
};

export default ManageBooks;
