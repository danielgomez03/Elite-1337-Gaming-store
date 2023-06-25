const { Router } = require('express');
const { getAllCategories, getCategoryById } = require('../handlers/categoriesHandler');

const categoriesRoutes = Router();

categoriesRoutes.get('/', getAllCategories);
categoriesRoutes.get('/:categoryId', getCategoryById);

module.exports = categoriesRoutes;