import { Store } from '../models/index.js';
import { responseHelper } from '../utils/responseHelper.js';

export const createStore = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const { name, description, location } = req.body;

    const store = await Store.create({ name, description, location, ownerId });
    return responseHelper.success(res, store, 'Store created successfully');
  } catch (error) {
    next(error);
  }
};

export const getStoresByOwner = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const stores = await Store.findAll({ where: { ownerId } });
    return responseHelper.success(res, stores);
  } catch (error) {
    next(error);
  }
};

export const updateStore = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;
    const { name, description, location } = req.body;

    const store = await Store.findOne({ where: { id, ownerId } });
    if (!store) return responseHelper.notFound(res, 'Store not found or unauthorized');

    store.name = name || store.name;
    store.description = description || store.description;
    store.location = location || store.location;
    await store.save();

    return responseHelper.success(res, store, 'Store updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteStore = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    const store = await Store.findOne({ where: { id, ownerId } });
    if (!store) return responseHelper.notFound(res, 'Store not found or unauthorized');

    await store.destroy();
    return responseHelper.success(res, null, 'Store deleted successfully');
  } catch (error) {
    next(error);
  }
};
