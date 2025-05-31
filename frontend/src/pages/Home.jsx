// pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white flex items-center justify-between px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">StoreRating</h1>
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="bg-white text-blue-800 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">Login</Link>
              <Link to="/register" className="bg-white text-blue-800 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-white text-xl hover:underline">👤</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-blue-100">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Welcome to StoreRating</h2>
        <p className="text-lg text-blue-700">Discover and rate the best local stores near you.</p>
        {!user && (
          <div className="mt-6">
            <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Get Started
            </Link>
          </div>
        )}
      </header>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Use StoreRating?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">⭐ Rate Stores</h4>
            <p className="text-gray-600">Help others by sharing your experience at local businesses.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">🔍 Discover Nearby</h4>
            <p className="text-gray-600">Easily explore highly-rated stores near your location.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">📊 Owner Insights</h4>
            <p className="text-gray-600">Store owners can view feedback and improve their service quality.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
