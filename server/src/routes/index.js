const { Router } = require('express');
// Import all routers;
// Example: const authRouter = require('./auth.js');
const getAllProducts = require('./GetAllProducts');
const postCreateProduct = require('./productsRoutes');


const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
router.use(getAllProducts);
// router.use(getProductByName);
router.use(postCreateProduct);


module.exports = router;