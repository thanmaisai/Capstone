import { render, screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import AddBookModal from './AddBookForm'; 

describe('AddBookModal Component', () => {
  it('renders form fields and buttons when modal is open', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddBookModal isOpen={true} onClose={() => {}} onBookAdded={() => {}} />
      </MockedProvider>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Available/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Borrowed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Book/i })).toBeInTheDocument();
  });
});
