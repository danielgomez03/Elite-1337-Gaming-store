const { Router } = require('express');
// Import all routers;
// Example: const authRouter = require('./auth.js');
const getAllProducts = require('./GetAllProducts');
const postCreateProduct = require('./productsRoutes');
const loadCategoriesRoute = require('./loadCategoriesRoute');


const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
router.use(getAllProducts);
// router.use(getProductByName);
router.use(postCreateProduct);
router.use(loadCategoriesRoute);


module.exports = router;