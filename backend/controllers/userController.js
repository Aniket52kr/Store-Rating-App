import { User } from '../models/index.js';
import { responseHelper } from '../utils/responseHelper.js';
import { hashPassword } from '../utils/hashPassword.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return responseHelper.conflict(res, 'User already exists');

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ username, email, password: hashedPassword, role: 'user' });

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

export const getAllUsers = async (req, res, next) => {
  try {
    // Admin only: middleware should enforce this
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role'],
    });
    return responseHelper.success(res, users);
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'role'],
    });
    if (!user) return responseHelper.notFound(res, 'User not found');
    return responseHelper.success(res, user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'role'],
    });
    if (!user) return responseHelper.notFound(res, 'User not found');
    return responseHelper.success(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    // Only allow updating own profile or admin updating any user
    const userId = req.user.role === 'admin' && req.params.id ? req.params.id : req.user.id;

    const user = await User.findByPk(userId);
    if (!user) return responseHelper.notFound(res, 'User not found');

    const { username, email } = req.body;
    user.username = username ?? user.username;
    user.email = email ?? user.email;
    await user.save();

    return responseHelper.success(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Only allow deleting own user or admin deleting any user
    const userId = req.user.role === 'admin' && req.params.id ? req.params.id : req.user.id;

    const user = await User.findByPk(userId);
    if (!user) return responseHelper.notFound(res, 'User not found');

    await user.destroy();
    return responseHelper.success(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};
