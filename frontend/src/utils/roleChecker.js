// utils/roleChecker.js

export const isAdmin = (user) => user?.role === 'admin';
export const isOwner = (user) => user?.role === 'owner';
export const isUser = (user) => user?.role === 'user';

export const hasRole = (user, roles = []) => {
  return roles.includes(user?.role);
};
