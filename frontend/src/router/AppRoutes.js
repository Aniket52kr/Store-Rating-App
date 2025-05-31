// router/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Logout from '../pages/auth/Logout';

import Dashboard from '../pages/admin/Dashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageStores from '../pages/admin/ManageStores';

import StoreList from '../pages/user/StoreList';
import StoreDetail from '../pages/user/StoreDetail';
import Profile from '../pages/user/Profile';
import PasswordUpdateUser from '../pages/user/PasswordUpdate';

import OwnerDashboard from '../pages/owner/OwnerDashboard';
import PasswordUpdateOwner from '../pages/owner/PasswordUpdate';

import NotFound from '../pages/NotFound';

import PrivateRoute from './PrivateRoute';
import RoleRoutes from './RoleRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

      {/* User Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/stores" element={<StoreList />} />
        <Route path="/stores/:id" element={<StoreDetail />} />
        <Route path="/update-password" element={<PasswordUpdateUser />} />
      </Route>

      {/* Owner Routes */}
      <Route element={<RoleRoutes roles={['owner']} />}>
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/update-password" element={<PasswordUpdateOwner />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleRoutes roles={['admin']} />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/stores" element={<ManageStores />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
