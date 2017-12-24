const express = require('express');
const categoryRoutes = require('../category/routes');
const productRoutes = require('../product/routes');

var router = express.Router();

router.use('/category', categoryRoutes);
router.use('/product', productRoutes);

module.exports = router;