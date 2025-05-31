import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import * as ratingController from '../controllers/ratingController.js';
import { ratingValidation } from '../validations/ratingValidation.js';
import { joiValidationMiddleware } from '../middlewares/joiValidationMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', ratingController.getAllRatings);
router.get('/:id', ratingController.getRatingById);

router.post(
  '/',
  joiValidationMiddleware(ratingValidation.createRating),
  ratingController.addRating
);

router.put(
  '/:id',
  joiValidationMiddleware(ratingValidation.updateRating),
  ratingController.updateRating
);

router.delete('/:id', ratingController.deleteRating);

export default router;
