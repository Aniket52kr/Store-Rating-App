import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const role = user?.role?.toLowerCase();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Store Rating App</Link>
      </h1>
      <nav className="space-x-4">
        {user ? (
          <>
            {role === 'admin' && (
              <>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
                <Link to="/admin/users">Manage Users</Link>
                <Link to="/admin/stores">Manage Stores</Link>
              </>
            )}
            {role === 'owner' && (
              <Link to="/owner/dashboard">Owner Dashboard</Link>
            )}
            {role === 'user' && (
              <>
                <Link to="/user/stores">Browse Stores</Link>
                <Link to="/user/profile">Profile</Link>
              </>
            )}

            <Link to={`/${role}/password-update`} className="ml-4">
              Change Password
            </Link>

            <button
              onClick={logout}
              className="ml-4 bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="ml-4">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
