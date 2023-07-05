const { Router } = require("express");
const {
  getAllOrders,
  getOrdersByProductId,
  getOrdersByUserId,
  postCreateOrder,
  putEditOrder,
} = require("../handlers/ordersHandler");

const ordersRoutes = Router();

ordersRoutes.get("/all", getAllOrders);
ordersRoutes.get("/product/:productId", getOrdersByProductId);
ordersRoutes.get("/user/:userId", getOrdersByUserId);

ordersRoutes.post("/create", postCreateOrder);
ordersRoutes.put("/edit", putEditOrder);

module.exports = ordersRoutes;
