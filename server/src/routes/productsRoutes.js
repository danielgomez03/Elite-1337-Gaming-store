const express = require('express');
const router = express.Router();
const { getProducts, getProductByIdHandler, postCreateProduct } = require('../handlers/productsHandler');

productsRouter.get("/", getProducts);
productsRouter.get("/:productId", getProductByIdHandler);
productsRouter.post("/", postCreateProduct);

module.exports = router;