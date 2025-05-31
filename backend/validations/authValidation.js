import Joi from 'joi';

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const register = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'owner', 'admin').optional(),
  address: Joi.string().max(255).optional(),
});

export const authValidation = {
  login,
  register,
};
