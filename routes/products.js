const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const reportController = require('../controllers/reports');
const { validateRequest } = require('../middleware/validate');
const { 
  createProductSchema, 
  updateProductSchema 
} = require('../validations/productValidation');

// Product collection routes
router.route('/')
  .get(productController.getAllProducts)
  .post(
    validateRequest(createProductSchema),
    productController.createProduct
  );

// Single product routes
router.route('/:id')
  .get(productController.getProduct)
  .patch(
    validateRequest(updateProductSchema),
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

// Product variant routes
router.patch(
  '/:productId/variants/:variantId/stock',
  productController.updateVariantStock
);

// Report routes
router.get('/reports/low-stock', reportController.getLowStockProducts);
router.get('/reports/category/:categoryId', reportController.getProductsByCategory);
router.get('/reports/discounted', reportController.getDiscountedProducts);

module.exports = router;