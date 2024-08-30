import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import { Container, Typography, Box, Card, CardMedia, CardContent, Grid, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';

const UserDashboard = () => {
    const { user } = useUser();
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const { data, loading, error } = useQuery(GET_BOOKS);

    useEffect(() => {
        if (data && user && user.borrowedBooks) {
            const borrowedBookIds = new Set(user.borrowedBooks);
            const filteredBorrowedBooks = data.books.filter(book => borrowedBookIds.has(book._id));
            setBorrowedBooks(filteredBorrowedBooks);
        }
    }, [data, user]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Alert severity="error">Error fetching books: {error.message}</Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h3" component="h1" align="center" gutterBottom>
                    User Dashboard
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                    Your role: {user?.role}
                </Typography>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Box my={4} p={2} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Summary
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Total books borrowed: <Typography component="span" fontWeight="bold" color="primary">{borrowedBooks.length}</Typography>
                        </Typography>
                    </Box>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Box my={4}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Borrowed Books
                        </Typography>
                        <Grid container spacing={3}>
                            {borrowedBooks.length > 0 ? (
                                borrowedBooks.map(book => (
                                    <Grid item xs={12} sm={6} md={4} key={book._id}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt={book.title}
                                                height="300"
                                                image={book.image}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" component="h3">
                                                    {book.title}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    Author: {book.author}
                                                </Typography>
                                                <Typography color="textSecondary">
                                                    Category: {book.category}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography align="center" color="textSecondary">
                                        No borrowed books
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </motion.div>
            </Box>
        </Container>
    );
};

export default UserDashboard;
