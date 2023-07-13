const { Router } = require("express");
const {
  getAllSaleHistoryHandler,
  getSaleHistoryByUserIdHandler,
  getSaleHistoryByProductIdHandler,
} = require("../handlers/saleHistoryHandler");

const saleHistoryRoutes = Router();

saleHistoryRoutes.get("/all", getAllSaleHistoryHandler);
saleHistoryRoutes.get("/user/:userId", getSaleHistoryByUserIdHandler);
saleHistoryRoutes.get("/product/:productId", getSaleHistoryByProductIdHandler);

module.exports = saleHistoryRoutes;
