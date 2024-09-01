import React, { useState, useMemo, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Container, Typography, Grid, useTheme, CircularProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';
import BooksList from './BooksList';
import SearchBar from '../Search/SearchBar';
import { GET_BOOKS, BORROW_BOOK } from '../../gqloperations/mutations';

const AllBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [borrowBook] = useMutation(BORROW_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('title');
  const role = useMemo(() => localStorage.getItem("role"), []);
  const theme = useTheme();

  // Memoize search filtering to avoid unnecessary recalculations
  const filteredBooks = useMemo(() => {
    if (!data) return [];
    return data.books.filter(book =>
      book[searchField].toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchField, searchText]);

  // Memoize the borrow function to prevent re-creation on each render
  const handleBorrow = useCallback(async (bookId) => {
    try {
      await borrowBook({ variables: { _id: bookId } });
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  }, [borrowBook]);

  const handleSearch = useCallback((field, text) => {
    setSearchField(field);
    setSearchText(text);
  }, []);

  if (role !== 'user') {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="error">
          Unauthorized access
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} disableGutters>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          minHeight: '100vh',
          width: '100vw',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          padding: theme.spacing(4),
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          All Books
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={8} lg={6}>
            <SearchBar
              placeholder="Search by title, author, or genre"
              searchText={searchText}
              setSearchText={setSearchText}
              onSearch={handleSearch}
            />
          </Grid>
        </Grid>

        {/* Display loading spinner centered but keeping the background and layout */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h5" align="center" color="error">
            Error: {error.message}
          </Typography>
        ) : (
          <Grid container spacing={3} style={{ marginTop: theme.spacing(2) }}>
            <Grid item xs={12}>
              <BooksList books={filteredBooks} onBorrow={handleBorrow} />
            </Grid>
          </Grid>
        )}
      </motion.div>
    </Container>
  );
};

export default AllBooks;
