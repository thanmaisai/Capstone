/* The above code is a React functional component called `UserDashboard`. Here is a summary of what the
code is doing: */
import React, { useEffect, useState } from 'react';
import { useUser } from '../UserContext';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import {
  Container, Typography, Box, CircularProgress, Alert, Paper,
  Grid, Card, CardContent, useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import BookIcon from '@mui/icons-material/Book';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BasicDateCalendar from '../BasicDateCalendar';

const UserDashboard = () => {
  const { user } = useUser();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const { data, loading, error } = useQuery(GET_BOOKS);
  const theme = useTheme();

  useEffect(() => {
    if (data && user && user.borrowedBooks) {
      const borrowedBookIds = new Set(user.borrowedBooks);
      const filteredBorrowedBooks = data.books.filter(book => borrowedBookIds.has(book._id));
      setBorrowedBooks(filteredBorrowedBooks);
    }
  }, [data, user]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ bgcolor: theme.palette.background.default }}
      >
        <Alert
          severity="error"
          sx={{ width: '100%', bgcolor: theme.palette.background.paper }}
        >
          <ErrorOutlineIcon sx={{ mr: 1 }} />
          Error fetching books: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          color={theme.palette.text.primary}
          sx={{ mb: 4 }}
        >
          <BookIcon sx={{ mr: 1 }} />
          User Dashboard
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color={theme.palette.text.secondary}
          gutterBottom
        >
          Your role: {user?.role}
        </Typography>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={4}>
            {/* Combined Summary and Borrowed Books Section */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      p: { xs: 2, sm: 4 },
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      gutterBottom
                      color={theme.palette.text.primary}
                    >
                      Summary
                    </Typography>
                    <Typography
                      variant="body1"
                      color={theme.palette.text.secondary}
                    >
                      Total books borrowed:
                      <span
                        style={{ fontWeight: 'bold', color: theme.palette.primary.main }}
                      >
                        {borrowedBooks.length}
                      </span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: theme.palette.background.paper,
                      p: { xs: 2, sm: 4 },
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      color={theme.palette.text.primary}
                    >
                      <BookIcon sx={{ mr: 1 }} />
                      Borrowed Books
                    </Typography>
                    {borrowedBooks.length > 0 ? (
                      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                        {borrowedBooks.map(book => (
                          <motion.li
                            key={book._id}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            style={{ marginBottom: theme.spacing(2) }}
                          >
                            <Paper
                              elevation={4}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 2,
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 2,
                                boxShadow: theme.shadows[3],
                              }}
                            >
                              <Box
                                component="img"
                                src={book.image}
                                alt={book.title}
                                sx={{ width: 96, height: 144, objectFit: 'cover', borderRadius: 1, mr: 2 }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="h6"
                                  color={theme.palette.text.primary}
                                >
                                  {book.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color={theme.palette.text.secondary}
                                >
                                  Author: {book.author}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color={theme.palette.text.secondary}
                                >
                                  Category: {book.category}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color={theme.palette.text.primary}
                                  sx={{ mt: 1 }}
                                >
                                  This book is borrowed.
                                </Typography>
                              </Box>
                            </Paper>
                          </motion.li>
                        ))}
                      </Box>
                    ) : (
                      <Typography
                        variant="body1"
                        color={theme.palette.text.secondary}
                        align="center"
                      >
                        No borrowed books
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Calendar Section */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <CardContent>
                  <BasicDateCalendar />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default UserDashboard;
