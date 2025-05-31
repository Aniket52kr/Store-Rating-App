import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import * as storeController from '../controllers/storeController.js';
import { storeValidation } from '../validations/storeValidation.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';
import { ROLES } from '../utils/roleConstants.js';

const router = express.Router();

// Public access
router.get('/', storeController.getAllStores);
router.get('/:id', storeController.getStoreById);

// Protected actions
router.use(authMiddleware);

router.post(
  '/',
  roleMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  joiValidationMiddleware(storeValidation.createStore),
  storeController.createStore
);

router.put(
  '/:id',
  roleMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  joiValidationMiddleware(storeValidation.updateStore),
  storeController.updateStore
);

router.delete(
  '/:id',
  roleMiddleware([ROLES.ADMIN, ROLES.OWNER]),
  storeController.deleteStore
);

export default router;
