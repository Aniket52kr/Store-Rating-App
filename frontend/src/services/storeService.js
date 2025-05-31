// services/storeService.js

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const addStore = async (storeData) => {
  try {
    const res = await fetch(`${API_URL}/stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeData),
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Failed to add store');
    return await res.json();
  } catch (error) {
    console.error('addStore error:', error);
    return null;
  }
};

export const getAllStores = async () => {
  try {
    const res = await fetch(`${API_URL}/stores`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch stores');
    return await res.json();
  } catch (error) {
    console.error('getAllStores error:', error);
    return [];
  }
};

export const getStoreById = async (storeId) => {
  try {
    const res = await fetch(`${API_URL}/stores/${storeId}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch store');
    return await res.json();
  } catch (error) {
    console.error('getStoreById error:', error);
    return null;
  }
};

export const searchStores = async (query) => {
  try {
    const res = await fetch(`${API_URL}/stores/search?q=${encodeURIComponent(query)}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  } catch (error) {
    console.error('searchStores error:', error);
    return [];
  }
};
