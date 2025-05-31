import Joi from 'joi';

const storeCreateSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Store name is required',
    'string.min': 'Store name must be at least 2 characters',
    'string.max': 'Store name must be at most 100 characters',
  }),
  address: Joi.string().max(200).required().messages({
    'string.empty': 'Address is required',
    'string.max': 'Address must be at most 200 characters',
  }),
  description: Joi.string().max(1000).allow('').optional(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).allow('').optional().messages({
    'string.pattern.base': 'Phone number must be valid',
  }),
});

const storeUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  address: Joi.string().max(200).allow('').optional(),
  description: Joi.string().max(1000).allow('').optional(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).allow('').optional().messages({
    'string.pattern.base': 'Phone number must be valid',
  }),
});

export const storeValidation = {
  createStore: storeCreateSchema,
  updateStore: storeUpdateSchema,
};
