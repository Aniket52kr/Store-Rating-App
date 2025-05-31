// services/authService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Logout failed');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

export const register = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Registration failed');
    return await res.json();
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
};

export const updatePassword = async (userId, passwords) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwords), // { oldPassword, newPassword }
    });
    if (!res.ok) throw new Error('Password update failed');
    return await res.json();
  } catch (error) {
    console.error('Password update error:', error);
    return null;
  }
};
