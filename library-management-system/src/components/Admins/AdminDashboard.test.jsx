import React from 'react';
import { render } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { MockedProvider } from '@apollo/client/testing';
import { GET_BOOKS } from '../../gqloperations/mutations';

// Mock for GET_BOOKS query
const mocks = [
    {
      request: {
        query: GET_BOOKS,
      },
      result: {
        data: {
          books: [
            {
              _id: '1',
              title: 'Book 1',
              category: 'Fiction',
              available: 10,
              borrowed: 5,
              author: 'Author 1',  // Add missing fields if needed
              image: 'url-to-image-1', // Example field
            },
            {
              _id: '2',
              title: 'Book 2',
              category: 'Science',
              available: 8,
              borrowed: 3,
              author: 'Author 2',  // Add missing fields if needed
              image: 'url-to-image-2', // Example field
            },
          ],
        },
      },
    },
  ];  

test('renders AdminDashboard without crashing', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AdminDashboard />
    </MockedProvider>
  );
});
