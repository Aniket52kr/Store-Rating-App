import { responseHelper } from '../utils/responseHelper.js';
import bcrypt from 'bcryptjs';
import { User, Store, Rating } from '../models/index.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    return responseHelper.success(res, users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'role']
    });
    if (!user) return responseHelper.notFound(res, 'User not found');
    return responseHelper.success(res, user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return responseHelper.conflict(res, 'Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });

    return responseHelper.success(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }, 'User created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) return responseHelper.notFound(res, 'User not found');

    await user.update({ username, email, role });

    return responseHelper.success(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    }, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return responseHelper.notFound(res, 'User not found');
    await user.destroy();
    return responseHelper.success(res, null, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};


export const getAdminStats = async (req, res, next) => {
  try {
    const userCount = await User.count();
    const storeCount = await Store.count();
    const ratingCount = await Rating.count();

    return res.status(200).json({
      success: true,
      data: {
        userCount,
        storeCount,
        ratingCount,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
