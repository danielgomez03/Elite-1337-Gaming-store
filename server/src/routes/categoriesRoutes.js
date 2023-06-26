const { Router } = require('express');
const { getCategories, getCategoryById } = require('../handlers/categoriesHandler');

const categoriesRoutes = Router();

categoriesRoutes.get('/', getCategories);
categoriesRoutes.get('/id/:categoryId', getCategoryById);

module.exports = categoriesRoutes;