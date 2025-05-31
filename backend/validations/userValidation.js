import Joi from 'joi';

const updateUser = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).messages({
    'string.pattern.base': 'Phone number must be valid',
  }),
});

export const userValidation = {
  updateUser,
};
