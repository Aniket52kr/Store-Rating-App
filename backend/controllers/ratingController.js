import { Rating, Store } from '../models/index.js';
import { responseHelper } from '../utils/responseHelper.js';

export const addRating = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { storeId, rating, comment } = req.body;

    const store = await Store.findByPk(storeId);
    if (!store) return responseHelper.notFound(res, 'Store not found');

    const newRating = await Rating.create({ userId, storeId, rating, comment });

    return responseHelper.success(res, newRating, 'Rating added successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getAllRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.findAll({
      include: [{ model: Store }],
      order: [['createdAt', 'DESC']],
    });
    return responseHelper.success(res, ratings);
  } catch (error) {
    next(error);
  }
};

export const getRatingById = async (req, res, next) => {
  try {
    const rating = await Rating.findByPk(req.params.id, {
      include: [{ model: Store }],
    });
    if (!rating) return responseHelper.notFound(res, 'Rating not found');
    return responseHelper.success(res, rating);
  } catch (error) {
    next(error);
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const ratingRecord = await Rating.findByPk(req.params.id);
    if (!ratingRecord) return responseHelper.notFound(res, 'Rating not found');

    // Only rating owner or admin can update
    if (ratingRecord.userId !== req.user.id && req.user.role !== 'admin') {
      return responseHelper.error(res, 'Unauthorized', 403);
    }

    const { rating, comment } = req.body;
    ratingRecord.rating = rating ?? ratingRecord.rating;
    ratingRecord.comment = comment ?? ratingRecord.comment;
    await ratingRecord.save();

    return responseHelper.success(res, ratingRecord, 'Rating updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteRating = async (req, res, next) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) return responseHelper.notFound(res, 'Rating not found');

    // Only rating owner or admin can delete
    if (rating.userId !== req.user.id && req.user.role !== 'admin') {
      return responseHelper.error(res, 'Unauthorized', 403);
    }

    await rating.destroy();
    return responseHelper.success(res, null, 'Rating deleted successfully');
  } catch (error) {
    next(error);
  }
};
