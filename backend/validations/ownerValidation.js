import Joi from 'joi';

export const createStore = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  location: Joi.string().required(),
});

export const updateStore = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
});
