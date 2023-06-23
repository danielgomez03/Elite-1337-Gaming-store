const { Router } = require('express');
// Import all routers;
// Example: const authRouter = require('./auth.js');
const getAllProducts = require('./GetAllProducts');
const postCreateProduct = require('./PostCreateProduct');
const getProductByName = require('./GetProductByName');


const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
router.use(getAllProducts);
router.use(postCreateProduct);
router.use(getProductByName);


module.exports = router;