const { Router } = require("express");
const { getProducts, getProductByIdHandler } = require('../handlers/productsHandler');
const postCreateProduct = require('../functions/postCreateProduct');

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:productId", getProductByIdHandler);
productsRouter.post("/", postCreateProduct);

module.exports = productsRouter;