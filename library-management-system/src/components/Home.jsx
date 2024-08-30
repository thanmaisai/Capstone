import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import '../App.css'; 

function Home() {
  return (
    <Container className="container" maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h2" component="h1" className="heading">
        Welcome to the Library Management System
      </Typography>

      <Typography variant="h6" component="p" className="description" paragraph>
        Manage your library's books, members, and more with ease. Our system offers a comprehensive suite of tools to keep everything organized and accessible.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="info-card" sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h5" component="h2" className="card-title">
              Manage Books
            </Typography>
            <Typography variant="body1" component="p" className="card-description">
              Add, edit, or remove books from your collection effortlessly.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="info-card" sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h5" component="h2" className="card-title">
              Track Members
            </Typography>
            <Typography variant="body1" component="p" className="card-description">
              Keep track of library members, their activities, and more.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="info-card" sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h5" component="h2" className="card-title">
              Borrow Books
            </Typography>
            <Typography variant="body1" component="p" className="card-description">
              Easily borrow books from the library and keep track of due dates.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="info-card" sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h5" component="h2" className="card-title">
              Check Available Books
            </Typography>
            <Typography variant="body1" component="p" className="card-description">
              View which books are currently available in the library.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="info-card" sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h5" component="h2" className="card-title">
              Admin Dashboard
            </Typography>
            <Typography variant="body1" component="p" className="card-description">
              See and manage all the books and library settings from one place.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="info-card" sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h5" component="h2" className="card-title">
              Chatbot
            </Typography>
            <Typography variant="body1" component="p" className="card-description">
              Get instant help and answers to your library-related questions through our chatbot.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
