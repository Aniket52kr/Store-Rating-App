// router/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
  const { user } = useAuth();

  // If user is logged in, render nested routes
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
