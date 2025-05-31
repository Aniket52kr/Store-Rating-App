// pages/owner/PasswordUpdate.jsx
import React, { useState } from 'react';
import { updatePassword } from '../../services/authService';
import useAuth from '../../hooks/useAuth';

const PasswordUpdate = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!password.trim()) {
      setError('Password cannot be empty.');
      return;
    }

    try {
      await updatePassword(user.id, password);
      setMessage('Password updated successfully.');
      setPassword('');
    } catch (err) {
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-sm text-green-600">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-center font-medium text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordUpdate;
