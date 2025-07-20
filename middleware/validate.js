const Joi = require('joi');
const AppError = require('../utils/appError');

/**
 * Middleware to validate request data against a Joi schema
 * @param {Joi.Schema} schema - The Joi validation schema
 * @returns {Function} Express middleware function
 */
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false
  });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return next(new AppError(`Validation error: ${errorMessages.join(', ')}`, 400));
  }

  next();
};

module.exports = {
  validateRequest
};