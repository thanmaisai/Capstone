import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UserProvider } from '../src/components/UserContext';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

// Setting up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

// Creating the root element for rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserProvider>
          <ThemeProvider theme={darkTheme}>
            <App />
          </ThemeProvider>
        </UserProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
