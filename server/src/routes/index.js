const { Router } = require('express');
const productsRoutes = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const usersRoutes = require('./usersRoutes');
const imagesRoutes = require('./imagesRoutes');

const router = Router();

router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/users', usersRoutes);
router.use('/images', imagesRoutes);

module.exports = router;