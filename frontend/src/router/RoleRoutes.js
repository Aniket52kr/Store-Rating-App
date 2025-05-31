// router/RoleRoutes.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RoleRoutes = ({ roles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (roles.includes(user.role)) return <Outlet />;

  return <Navigate to="/" replace />;
};

export default RoleRoutes;
