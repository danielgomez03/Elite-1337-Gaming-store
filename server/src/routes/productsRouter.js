const { Router } = require("express");
const getAllProducts = require('../functions/getAllProducts');
const postCreateProduct = require('../functions/postCreateProduct');

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", postCreateProduct);

module.exports = productsRouter;