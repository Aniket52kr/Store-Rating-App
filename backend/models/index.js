import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Setup connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

// Import models
import UserModel from './User.js';
import StoreModel from './Store.js';
import RatingModel from './Rating.js';

// Initialize models
const User = UserModel(sequelize);
const Store = StoreModel(sequelize);
const Rating = RatingModel(sequelize);

// Define relationships
User.hasMany(Store, { foreignKey: 'ownerId', as: 'stores' });
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Store.hasMany(Rating, { foreignKey: 'storeId', as: 'ratings' });
Rating.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

export {
  sequelize,
  User,
  Store,
  Rating,
};
