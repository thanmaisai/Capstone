/* This code snippet is a React component named `AdminDashboard`. Here's a breakdown of what it does: */
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../gqloperations/mutations';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const AdminDashboard = () => {
  const theme = useTheme();
  const [role, setRole] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const books = data.books;

  // Calculating overall stats
  const totalBooks = books.length;
  const totalAvailable = books.reduce((sum, book) => sum + book.available, 0);
  const totalBorrowed = books.reduce((sum, book) => sum + book.borrowed, 0);

  // Data for charts
  const categories = [...new Set(books.map(book => book.category))];
  const booksPerCategory = categories.map(category => {
    return books
      .filter(book => book.category === category)
      .reduce((total, book) => total + book.available, 0);
  });
  const borrowedPerCategory = categories.map(category => {
    return books
      .filter(book => book.category === category)
      .reduce((total, book) => total + book.borrowed, 0);
  });

  const availabilityChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Books Available',
        data: booksPerCategory,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const borrowedChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Books Borrowed',
        data: borrowedPerCategory,
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.dark,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Admin Dashboard
      </Typography>

      {/* Overall Stats Section */}
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '2rem', borderRadius: '8px', boxShadow: theme.shadows[3], textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Total Books</Typography>
            <Typography variant="h4" color="primary">{totalBooks}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '2rem', borderRadius: '8px', boxShadow: theme.shadows[3], textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Books Available</Typography>
            <Typography variant="h4" color="success.main">{totalAvailable}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: '2rem', borderRadius: '8px', boxShadow: theme.shadows[3], textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Books Borrowed</Typography>
            <Typography variant="h4" color="error.main">{totalBorrowed}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ padding: '2rem', borderRadius: '8px', boxShadow: theme.shadows[3] }}>
            <Typography variant="h6" gutterBottom align="center">Books Available by Category</Typography>
            <Bar data={availabilityChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ padding: '2rem', borderRadius: '8px', boxShadow: theme.shadows[3] }}>
            <Typography variant="h6" gutterBottom align="center">Books Borrowed by Category</Typography>
            <Bar data={borrowedChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </Paper>
        </Grid>
      </Grid>

      {/* Detailed List Section */}
      <Box mt={4}>
        <Paper sx={{ padding: '2rem', borderRadius: '8px', boxShadow: theme.shadows[3] }}>
          <Typography variant="h6" gutterBottom align="center">Books List by Category</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Borrowed</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell align="center">{book.available}</TableCell>
                    <TableCell align="center">{book.borrowed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
