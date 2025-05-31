import Joi from 'joi';

export const createUser = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'owner', 'user').required(),
});

export const updateUser = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  role: Joi.string().valid('admin', 'owner', 'user'),
});
