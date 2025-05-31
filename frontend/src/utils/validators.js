// utils/validators.js

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPassword = (password) => {
  return password.length >= 6;
};

export const isValidUsername = (username) => {
  return username && username.length >= 3;
};
