const { Router } = require('express');
// Import all routers;
// Example: const authRouter = require('./auth.js');
const productsRouter = require("./productsRouter");
const postCreateProduct = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');

const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRoutes);

module.exports = router;
