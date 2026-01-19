import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();

  // 1. Jika belum login, tendang ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Jika sudah login tapi role tidak sesuai, tendang ke halaman masing-masing
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return user?.role === 'admin' 
      ? <Navigate to="/admin" replace /> 
      : <Navigate to="/user" replace />;
  }

  return children;
};

export default ProtectedRoute;
