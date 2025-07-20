const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().max(50).required(),
  description: Joi.string().max(500).allow(''),
  isActive: Joi.boolean(),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().max(50),
  description: Joi.string().max(500).allow(''),
  isActive: Joi.boolean(),
}).min(1);

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};