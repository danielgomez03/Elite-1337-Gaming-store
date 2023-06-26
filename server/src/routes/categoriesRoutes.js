const { Router } = require('express');
const { getCategories, getCategoryById } = require('../handlers/categoriesHandler');

const categoriesRoutes = Router();

categoriesRoutes.get('/', getCategories);
categoriesRoutes.get('/:categoryId', getCategoryById);

module.exports = categoriesRoutes;