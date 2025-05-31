import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { responseHelper } from '../utils/responseHelper.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return responseHelper.conflict(res, 'Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    return responseHelper.success(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return responseHelper.unauthorized(res, 'Invalid email or password');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return responseHelper.success(res, {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  // Usually JWT tokens are stateless; logout is handled client-side by discarding token
  return responseHelper.success(res, null, 'Logged out successfully');
};
