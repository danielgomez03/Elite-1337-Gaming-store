const { Router } = require('express');
const router = Router();
const productsRouter = require("./productsRouter");
const categoriesRoutes = require('./categoriesRoutes');

router.use('/products', productsRouter);
router.use('/categories', categoriesRoutes);

module.exports = router;