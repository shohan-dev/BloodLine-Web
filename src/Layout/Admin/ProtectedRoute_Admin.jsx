import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './Admin_login';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProtectedRouteAdmin = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen message="Checking authentication..." />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <AdminLogin />;
  }

  return children;
};

export default ProtectedRouteAdmin;
