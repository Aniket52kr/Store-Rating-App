import express from 'express';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as adminController from '../controllers/adminController.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';
import { createUser, updateUser } from '../validations/adminValidation.js';
import { ROLES } from '../utils/roleConstants.js';

import * as storeController from '../controllers/storeController.js';
import { storeValidation } from '../validations/storeValidation.js';

const router = express.Router();

// Only admin can access
router.use(authMiddleware, roleMiddleware(ROLES.ADMIN));

// Add stats route
router.get('/stats', adminController.getAdminStats);

router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.post('/users', joiValidationMiddleware(createUser), adminController.createUser);
router.put('/users/:id', joiValidationMiddleware(updateUser), adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);


// Add these to admin routes:
router.get('/stores', storeController.getAllStores);

router.post(
  '/stores',
  joiValidationMiddleware(storeValidation.createStore),
  storeController.createStore
);

router.delete('/stores/:id', storeController.deleteStore);


export default router;
