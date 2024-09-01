// src/components/Home.js
import React, { useEffect } from 'react';
import { Typography, Container, Grid, Paper, Card, CardContent, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import '../App.css';

function Home() {
  const theme = useTheme();

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://unpkg.com/@splinetool/viewer@1.9.21/build/spline-viewer.js';
  //   script.type = 'module';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        {/* <Card
          style={{
            width: '100%',
            maxWidth: '800px',
            marginBottom: '32px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardContent>
            <spline-viewer
              url="https://prod.spline.design/C5cPatwpSjcxXpja/scene.splinecode"
              style={{
                width: '100%',
                height: '400px',
                borderRadius: '8px',
              }}
            ></spline-viewer>
          </CardContent>
        </Card> */}

      <Typography
        variant="h2"
        component="h1"
        style={{
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Welcome to the Library Management System
      </Typography>

      <Typography
        variant="h6"
        component="p"
        style={{
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
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
              <Paper
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '192px',
                  textAlign: 'center',
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s',
                }}
                className="info-card"
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  style={{
                    marginBottom: '16px',
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                >
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
