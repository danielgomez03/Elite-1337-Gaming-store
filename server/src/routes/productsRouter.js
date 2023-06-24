const { Router } = require("express");
const { getProducts } = require('../handlers/productsHandler');
const postCreateProduct = require('../functions/postCreateProduct');

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", postCreateProduct);

module.exports = productsRouter;