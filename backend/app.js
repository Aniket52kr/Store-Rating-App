// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';

// import errorMiddleware from './middlewares/errorMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/password', passwordRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

// Central Error Handling Middleware
app.use(errorMiddleware);

export default app;
