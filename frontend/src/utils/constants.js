// utils/constants.js

export const USER_ROLES = {
  ADMIN: 'admin',
  OWNER: 'owner',
  USER: 'user',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const DEFAULT_STORE_IMAGE = '/assets/default-store.png';

export const RATING_SCALE = 5;
