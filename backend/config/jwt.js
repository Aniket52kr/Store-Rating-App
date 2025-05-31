import dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default_jwt_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '5d',
};
