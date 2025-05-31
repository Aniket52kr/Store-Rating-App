// services/passwordService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// You can move password update API here if preferred, or keep in authService

export const changePassword = async (userId, passwords) => {
  try {
    const res = await fetch(`${API_URL}/users/${userId}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passwords), // { oldPassword, newPassword }
    });
    if (!res.ok) throw new Error('Password change failed');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
