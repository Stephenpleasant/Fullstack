import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Optional: add token expiration check here in future
  return token ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
// This component checks if the user is authenticated by verifying the presence of a JWT token.
// If the token exists, it renders the child components (protected routes). 