import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProtectedRouteUser = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return children;
};

export default ProtectedRouteUser;
