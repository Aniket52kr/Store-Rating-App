import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as userController from '../controllers/userController.js';
import { userValidation } from '../validations/userValidation.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';

const router = express.Router();

// Public user registration (if needed)
router.post('/register', joiValidationMiddleware(userValidation.register), userController.register);

// Authenticated user operations
router.use(authMiddleware);

router.get('/', userController.getAllUsers);
router.get('/me', userController.getCurrentUser);
router.get('/:id', userController.getUserById);
router.put('/me', joiValidationMiddleware(userValidation.updateUser), userController.updateUser);
router.delete('/me', userController.deleteUser);

export default router;
