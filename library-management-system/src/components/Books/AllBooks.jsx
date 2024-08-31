import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, BORROW_BOOK } from '../../gqloperations/mutations';
import { Container, Typography, TextField, Button, Paper, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import BooksList from './BooksList';

const AllBooks = () => {
    const { loading, error, data } = useQuery(GET_BOOKS);
    const [borrowBook] = useMutation(BORROW_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
    });
    const [searchText, setSearchText] = useState('');
    const role = localStorage.getItem("role");
    const theme = useTheme();

    if (role !== 'user') {
        return (
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="error">
                    Unauthorized access
                </Typography>
            </Container>
        );
    }

    if (loading) return (
        <Container maxWidth="sm">
            <Typography variant="h5" align="center">Loading...</Typography>
        </Container>
    );
    
    if (error) return (
        <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="error">Error: {error.message}</Typography>
        </Container>
    );

    // Filter books based on search text
    const filteredBooks = data?.books.filter(book =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.category.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleBorrow = async (bookId) => {
        try {
            await borrowBook({ variables: { _id: bookId } });
        } catch (error) {
            console.error("Error borrowing book:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ 
                    minHeight: '100vh',
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    padding: theme.spacing(4)
                }}
            >
                <Typography variant="h3" align="center" gutterBottom>
                    All Books
                </Typography>
                <Paper elevation={3} style={{ padding: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        margin="normal"
                    />
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <BooksList books={filteredBooks} onBorrow={handleBorrow} />
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

export default AllBooks;
