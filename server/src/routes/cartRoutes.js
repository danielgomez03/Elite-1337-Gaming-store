const { Router } = require("express");
const {
  getCartByUserIdHandler,
  getCartsByUserNameHandler,
  getCartByProductIdHandler,
  getCartsByProductNameHandler,
  getProductsInCartsHandler,
  getUsersWithActiveCartsHandler,
  addProductToCartHandler,
  removeProductFromCartHandler,
  editCartProductQuantityHandler,
} = require("../handlers/cartHandler");

const cartsRouter = Router();

cartsRouter.get("/user/:userId", getCartByUserIdHandler);
cartsRouter.get("/user", getCartsByUserNameHandler);
cartsRouter.get("/users/", getUsersWithActiveCartsHandler);

cartsRouter.get("/product/:productId", getCartByProductIdHandler);
cartsRouter.get("/product", getCartsByProductNameHandler);
cartsRouter.get("/products", getProductsInCartsHandler);

cartsRouter.post("/add", addProductToCartHandler);
cartsRouter.delete("/remove", removeProductFromCartHandler);
cartsRouter.patch("/edit", editCartProductQuantityHandler);

module.exports = cartsRouter;
