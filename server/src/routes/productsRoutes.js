const { Router } = require('express');
const { getProducts, getProductByIdHandler, postCreateProduct } = require('../handlers/productsHandler');

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:productId", getProductByIdHandler);
productsRouter.post("/", postCreateProduct);

module.exports = productsRouter;