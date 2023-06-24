const { Router } = require('express');
// Import all routers;
// Example: const authRouter = require('./auth.js');
const productsRouter = require("./productsRouter");

const router = Router();

// Configure routers
// Example: router.use('/auth', authRouter);
router.use('/products', productsRouter);


module.exports = router;