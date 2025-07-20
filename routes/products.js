const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const reportController = require('../controllers/reports');
const { validateRequest } = require('../middleware/validate');
const { 
  createProductSchema, 
  updateProductSchema 
} = require('../validations/productValidation');

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management
 *   - name: Reports
 *     description: Product reports
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of products
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of products to skip
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.route('/')
  .get(productController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.route('/')
  .post(
    validateRequest(createProductSchema),
    productController.createProduct
  );

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.route('/:id')
  .get(productController.getProduct);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.route('/:id')
  .patch(
    validateRequest(updateProductSchema),
    productController.updateProduct
  );

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.route('/:id')
  .delete(productController.deleteProduct);

/**
 * @swagger
 * /products/{productId}/variants/{variantId}/stock:
 *   patch:
 *     summary: Update product variant stock
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *       - in: path
 *         name: variantId
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStockInput'
 *     responses:
 *       200:
 *         description: Stock updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductVariant'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Product or variant not found
 *       500:
 *         description: Server error
 */
router.patch(
  '/:productId/variants/:variantId/stock',
  productController.updateVariantStock
);

/**
 * @swagger
 * /products/reports/low-stock:
 *   get:
 *     summary: Get low stock products
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: threshold
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Stock threshold to consider as low stock
 *     responses:
 *       200:
 *         description: List of low stock products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LowStockProduct'
 *       500:
 *         description: Server error
 */
router.get('/reports/low-stock', reportController.getLowStockProducts);

/**
 * @swagger
 * /products/reports/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of products in category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/reports/category/:categoryId', reportController.getProductsByCategory);

/**
 * @swagger
 * /products/reports/discounted:
 *   get:
 *     summary: Get discounted products
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: minDiscount
 *         schema:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 100
 *         description: Minimum discount percentage to filter
 *     responses:
 *       200:
 *         description: List of discounted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscountedProduct'
 *       500:
 *         description: Server error
 */
router.get('/reports/discounted', reportController.getDiscountedProducts);

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Product ID
 *         name:
 *           type: string
 *           description: Product name
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           format: float
 *           description: Product price
 *         category:
 *           type: string
 *           description: Category ID
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductVariant'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 507f1f77bcf86cd799439011
 *         name: "Premium Headphones"
 *         description: "Noise cancelling wireless headphones"
 *         price: 299.99
 *         category: "6391c5a2b5d5f3a2a7c3d4e5"
 *         variants:
 *           - id: "6391c5a2b5d5f3a2a7c3d4e6"
 *             color: "black"
 *             size: "standard"
 *             stock: 15
 *         createdAt: "2023-12-08T10:00:00Z"
 *         updatedAt: "2023-12-08T10:00:00Z"
 * 
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         category:
 *           type: string
 *         variants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateVariantInput'
 * 
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         category:
 *           type: string
 * 
 *     ProductVariant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         color:
 *           type: string
 *         size:
 *           type: string
 *         stock:
 *           type: integer
 * 
 *     CreateVariantInput:
 *       type: object
 *       required:
 *         - color
 *         - stock
 *       properties:
 *         color:
 *           type: string
 *         size:
 *           type: string
 *         stock:
 *           type: integer
 * 
 *     UpdateStockInput:
 *       type: object
 *       required:
 *         - stock
 *       properties:
 *         stock:
 *           type: integer
 *           description: New stock quantity
 *         operation:
 *           type: string
 *           enum: [set, increment, decrement]
 *           default: set
 *           description: Stock update operation
 * 
 *     LowStockProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/Product'
 *         - type: object
 *           properties:
 *             stockStatus:
 *               type: string
 *               enum: [low, critical]
 * 
 *     DiscountedProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/Product'
 *         - type: object
 *           properties:
 *             discountPercentage:
 *               type: number
 *               format: float
 *             originalPrice:
 *               type: number
 *               format: float
 */

module.exports = router;