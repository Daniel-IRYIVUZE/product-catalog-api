const Joi = require('joi');

const variantSchema = Joi.object({
  name: Joi.string().max(50).required(),
  sku: Joi.string().max(50).required(),
  additionalCost: Joi.number().min(0).default(0),
  stockCount: Joi.number().integer().min(0).required()
});

const createProductSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(1000).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  variants: Joi.array().items(variantSchema),
  images: Joi.array().items(Joi.string().uri()),
  isActive: Joi.boolean().default(true),
  discount: Joi.number().min(0).max(100).default(0)
});

const updateProductSchema = Joi.object({
  name: Joi.string().max(100),
  description: Joi.string().max(1000),
  price: Joi.number().min(0),
  category: Joi.string().hex().length(24),
  variants: Joi.array().items(variantSchema),
  images: Joi.array().items(Joi.string().uri()),
  isActive: Joi.boolean(),
  discount: Joi.number().min(0).max(100)
}).min(1); // At least one field to update

module.exports = {
  createProductSchema,
  updateProductSchema
};