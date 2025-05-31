import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as passwordController from '../controllers/passwordController.js';
import { passwordValidation } from '../validations/passwordValidation.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.put(
  '/update',
  joiValidationMiddleware(passwordValidation.updatePassword),
  passwordController.changePassword
);

export default router;
