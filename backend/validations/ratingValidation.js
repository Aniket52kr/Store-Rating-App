// validations/ratingValidation.js
import Joi from 'joi';

const ratingCreateSchema = Joi.object({
  storeId: Joi.number().integer().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().max(500).allow('').optional(),
});

const ratingUpdateSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  comment: Joi.string().max(500).allow('').optional(),
});

export const ratingValidation = {
  createRating: ratingCreateSchema,
  updateRating: ratingUpdateSchema,
};
