const express = require('express');
const router = express.Router();
const productRoutes = require('./products');
const categoryRoutes = require('./categories');
const { default: mongoose } = require('mongoose');

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
module.exports = router;