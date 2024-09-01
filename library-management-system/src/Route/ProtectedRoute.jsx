/**
 * The `ProtectedRoute` component in JavaScript React checks user authentication and role permissions
 * before rendering the specified component or redirecting to appropriate pages.
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../components/UserContext';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If the user's role is not allowed, redirect to home or an error page
    return <Navigate to="/" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
