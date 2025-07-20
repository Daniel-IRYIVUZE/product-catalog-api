const Product = require('../models/Product');
const AppError = require('../utils/appError');
const logger = require('../config/logger');

exports.getLowStockProducts = async (req, res, next) => {
  try {
    const threshold = req.query.threshold || 10;

    const products = await Product.find({
      $or: [
        { 'variants.stockCount': { $lte: threshold } },
        { variants: { $size: 0 }, stockCount: { $lte: threshold } },
      ],
      isActive: true,
    });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    const products = await Product.find({ category: categoryId, isActive: true });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getDiscountedProducts = async (req, res, next) => {
  try {
    const minDiscount = req.query.minDiscount || 10;

    const products = await Product.find({
      discount: { $gte: minDiscount },
      isActive: true,
    });

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    next(err);
  }
};