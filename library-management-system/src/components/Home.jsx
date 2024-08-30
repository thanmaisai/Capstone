import React from 'react';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
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
        {[ 
          { title: "Manage Books", description: "Add, edit, or remove books from your collection effortlessly." },
          { title: "Track Members", description: "Keep track of library members, their activities, and more." },
          { title: "Borrow Books", description: "Easily borrow books from the library and keep track of due dates." },
          { title: "Check Available Books", description: "View which books are currently available in the library." },
          { title: "Admin Dashboard", description: "See and manage all the books and library settings from one place." },
          { title: "Chatbot", description: "Get instant help and answers to your library-related questions through our chatbot." }
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper className="info-card" sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                padding: 3, 
                height: 200, 
                textAlign: 'center' 
              }}>
                <Typography variant="h5" component="h2" className="card-title" sx={{ marginBottom: 2 }}>
                  {card.title}
                </Typography>
                <Typography variant="body1" component="p" className="card-description">
                  {card.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
