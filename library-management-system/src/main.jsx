import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App';
import {
  BrowserRouter
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

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
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
