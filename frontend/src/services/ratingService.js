// services/ratingService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUserRatings = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/ratings/user/${userId}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch user ratings');
    return await res.json();
  } catch (error) {
    console.error('getUserRatings error:', error);
    return null;
  }
};

export const getOwnerRatings = async (ownerId) => {
  try {
    const res = await fetch(`${API_URL}/ratings/owner/${ownerId}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch owner ratings');
    return await res.json();
  } catch (error) {
    console.error('getOwnerRatings error:', error);
    return null;
  }
};

export const submitRating = async (ratingData) => {
  try {
    const res = await fetch(`${API_URL}/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratingData),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to submit rating');
    return await res.json();
  } catch (error) {
    console.error('submitRating error:', error);
    return null;
  }
};

export const updateRating = async (ratingId, ratingData) => {
  try {
    const res = await fetch(`${API_URL}/ratings/${ratingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ratingData),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to update rating');
    return await res.json();
  } catch (error) {
    console.error('updateRating error:', error);
    return null;
  }
};
