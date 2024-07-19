import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/main/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
