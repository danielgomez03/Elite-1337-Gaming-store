const { Router } = require('express');
const productsRoutes = require("./productsRoutes");
const categoriesRoutes = require('./categoriesRoutes');

const router = Router();

router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;