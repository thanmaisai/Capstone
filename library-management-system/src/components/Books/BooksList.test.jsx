import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BooksList from './BooksList';

// Mock the `useUser` hook
vi.mock('../UserContext', () => ({
  useUser: () => ({
    user: { borrowedBooks: [] },
    borrowBook: vi.fn(),
  }),
}));

// Mock Apollo Client's `useMutation` and `gql`
vi.mock('@apollo/client', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMutation: () => [vi.fn()],
    gql: vi.fn().mockImplementation((strings) => strings),
  };
});

describe('BooksList', () => {
  const books = [
    {
      _id: '1',
      title: 'Book Title 1',
      author: 'Author 1',
      category: 'Category 1',
      image: 'https://via.placeholder.com/150',
      available: 5,
      borrowed: 2,
    },
    {
      _id: '2',
      title: 'Book Title 2',
      author: 'Author 2',
      category: 'Category 2',
      image: 'https://via.placeholder.com/150',
      available: 3,
      borrowed: 1,
    },
  ];

  it('renders the BooksList component with books', () => {
    render(
      <BooksList
        books={books}
        role="user"
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />
    );

    // Check if books are rendered
    expect(screen.getByText('Book Title 1')).toBeInTheDocument();
    expect(screen.getByText('Book Title 2')).toBeInTheDocument();

    // Check if buttons are rendered
    // expect(screen.getByText('Borrow')).toBeInTheDocument();
  });
});
