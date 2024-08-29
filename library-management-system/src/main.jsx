// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from '../src/components/UserContext';
import client from './apolloClient'; // Import the client from apolloClient.js

// Creating the root element for rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserProvider>
          <App/>
        </UserProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
