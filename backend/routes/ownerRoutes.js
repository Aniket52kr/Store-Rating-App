import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';
import * as ownerController from '../controllers/ownerController.js';
import { createStore, updateStore } from '../validations/ownerValidation.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';
import { ROLES } from '../utils/roleConstants.js';

console.log('joiValidationMiddleware:', typeof joiValidationMiddleware);
console.log('createStore schema:', typeof createStore.validate === 'function');
console.log('ownerController.createStore:', typeof ownerController.createStore);

const router = express.Router();

// Only owners allowed
router.use(authMiddleware, roleMiddleware(ROLES.OWNER));

router.get('/stores', ownerController.getStoresByOwner);

router.post(
  '/stores',
  joiValidationMiddleware(createStore),
  ownerController.createStore
);

router.put(
  '/stores/:id',
  joiValidationMiddleware(updateStore),
  ownerController.updateStore
);

router.delete('/stores/:id', ownerController.deleteStore);

export default router;
