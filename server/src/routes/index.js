const { Router } = require('express');
const productsRouter = require("./productsRoutes");
const categoriesRoutes = require('./categoriesRoutes');

const router = Router();

router.use('/products', productsRouter);
router.use('/categories', categoriesRoutes);

module.exports = router;