
import { render, screen } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { UserProvider } from '../UserContext'; // Adjust import if needed
import Login from './Login';
import { LOGIN_USER } from '../../gqloperations/mutations'; // Adjust the path if necessary

describe('Login Component', () => {
  it('renders login form with email and password fields', () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={[]} addTypename={false}>
          <UserProvider>
            <Login />
          </UserProvider>
        </MockedProvider>
      </MemoryRouter>
    );
    
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});