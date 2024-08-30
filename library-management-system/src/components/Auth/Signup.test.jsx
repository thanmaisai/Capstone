import { render, screen, fireEvent } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import Signup from './Signup'; // Adjust import if needed
import { SIGNUP_USER } from '../../gqloperations/mutations'; // Adjust the path if necessary
const mocks = [
  {
    request: {
      query: SIGNUP_USER,
      variables: {
        userNew: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          role: 'user'
        }
      }
    },
    result: {
      data: {
        signupUser: {
          _id: 'mockId', // Include _id
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com', // Include email
          role: 'user' // Include role
        }
      }
    }
  }
];


describe('Signup Component', () => {
  it('renders signup form and handles form submission', async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Signup />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    expect(await screen.findByText(/John is signed up. You can log in now!/i)).toBeInTheDocument();
  });
});
