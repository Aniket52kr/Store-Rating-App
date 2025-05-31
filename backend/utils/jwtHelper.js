import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '5d';

/**
 * Generate JWT token from payload (e.g., user ID, role)
 * @param {Object} payload
 * @returns {string} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify and decode JWT token
 * @param {string} token
 * @returns {Object} decoded payload
 * @throws {Error} if token is invalid or expired
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
