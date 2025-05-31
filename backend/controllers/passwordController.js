// controllers/passwordController.js
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import { responseHelper } from '../utils/responseHelper.js';

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return responseHelper.notFound(res, 'User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return responseHelper.badRequest(res, 'Current password is incorrect');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return responseHelper.success(res, null, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};
