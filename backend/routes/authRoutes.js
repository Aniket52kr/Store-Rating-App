import express from 'express';
import * as authController from '../controllers/authController.js';
import { authValidation } from '../validations/authValidation.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';

const router = express.Router();

router.post('/register', joiValidationMiddleware(authValidation.register), authController.register);
router.post('/login', joiValidationMiddleware(authValidation.login), authController.login);
router.post('/logout', authController.logout);

export default router;
