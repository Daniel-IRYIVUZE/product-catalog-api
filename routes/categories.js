const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const { validateRequest } = require('../middleware/validate');
const { createCategorySchema, updateCategorySchema } = require('../validations/categoryValidation');

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(validateRequest(createCategorySchema), categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(validateRequest(updateCategorySchema), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;