const Product = require('../models/Product');
const Category = require('../models/Category');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const { createProductSchema, updateProductSchema } = require('../validations/productValidation');
const logger = require('../config/logger');

exports.getAllProducts = async (req, res, next) => {
  try {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    const products = await features.query;

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

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    // Check if category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      throw new AppError('No category found with that ID', 404);
    }

    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        throw new AppError('No category found with that ID', 404);
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateVariantStock = async (req, res, next) => {
  try {
    const { productId, variantId } = req.params;
    const { stockCount } = req.body;

    if (!stockCount && stockCount !== 0) {
      throw new AppError('Stock count is required', 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('No product found with that ID', 404);
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
      throw new AppError('No variant found with that ID', 404);
    }

    variant.stockCount = stockCount;
    await product.save();

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (err) {
    next(err);
  }
};