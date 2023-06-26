const { Router } = require('express');
const { getProducts, getProductByIdHandler, postCreateProduct } = require('../handlers/productsHandler');

const productsRoutes = Router();

productsRoutes.get('/', getProducts);
productsRoutes.get('/id/:productId', getProductByIdHandler);

productsRoutes.post('/create', postCreateProduct);

module.exports = productsRoutes;