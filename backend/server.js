// server.js
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { sequelize } from './models/index.js'; // ✅ Import sequelize

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // ✅ Connect to DB manually if needed

    // ✅ Sync models with DB to reflect latest schema
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced with database');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();
