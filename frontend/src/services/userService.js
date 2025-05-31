// services/userService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUserProfile = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return await res.json();
  } catch (error) {
    console.error('getUserProfile error:', error);
    return null;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return await res.json();
  } catch (error) {
    console.error('updateUserProfile error:', error);
    return null;
  }
};
