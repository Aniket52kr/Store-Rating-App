import { Store, User, Rating } from '../models/index.js';
import { responseHelper } from '../utils/responseHelper.js';
import { Sequelize } from 'sequelize';

export const getAllStores = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn('AVG', Sequelize.col('Ratings.rating')),
            'averageRating',
          ],
        ],
      },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Rating,
          attributes: [],
        },
      ],
      group: ['Store.id', 'owner.id'],
    });

    return responseHelper.success(res, stores);
  } catch (error) {
    next(error);
  }
};

export const getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Rating,
          include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
        },
      ],
    });
    if (!store) return responseHelper.notFound(res, 'Store not found');

    // Calculate average rating
    const ratings = store.Ratings || [];
    const averageRating =
      ratings.length > 0
        ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
        : null;

    const storeData = {
      id: store.id,
      name: store.name,
      address: store.address,
      description: store.description,
      phone: store.phone,
      owner: store.owner,
      averageRating,
      ratings: ratings.map(r => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        user: r.user,
      })),
    };

    return responseHelper.success(res, storeData);
  } catch (error) {
    next(error);
  }
};

export const createStore = async (req, res, next) => {
  try {
    const { name, address, description, phone } = req.body;

    if (!name || !address) {
      return responseHelper.error(res, 'Name and address are required', 400);
    }

    // Admin can assign any ownerId; owner creates with their own id
    const ownerId =
      req.user.role === 'admin' ? req.body.ownerId || req.user.id : req.user.id;

    const store = await Store.create({
      name,
      address,
      description,
      phone,
      ownerId,
    });
    return responseHelper.success(res, store, 'Store created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateStore = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return responseHelper.notFound(res, 'Store not found');

    if (req.user.role === 'owner' && store.ownerId !== req.user.id) {
      return responseHelper.error(res, 'Not authorized', 403);
    }

    await store.update(req.body);
    return responseHelper.success(res, store, 'Store updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteStore = async (req, res, next) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return responseHelper.notFound(res, 'Store not found');

    if (req.user.role === 'owner' && store.ownerId !== req.user.id) {
      return responseHelper.error(res, 'Not authorized', 403);
    }

    await store.destroy();
    return responseHelper.success(res, null, 'Store deleted successfully');
  } catch (error) {
    next(error);
  }
};