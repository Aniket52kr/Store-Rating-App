// validations/passwordValidation.js
import Joi from 'joi';

const passwordUpdateSchema = Joi.object({
  currentPassword: Joi.string().min(6).required().messages({
    'string.empty': 'Current password is required',
    'string.min': 'Current password must be at least 6 characters',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.empty': 'New password is required',
    'string.min': 'New password must be at least 6 characters',
  }),
  confirmNewPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'Confirm password does not match new password',
    'any.required': 'Please confirm your new password',
  }),
});

// Wrap and export as an object
export const passwordValidation = {
  updatePassword: passwordUpdateSchema,
};
