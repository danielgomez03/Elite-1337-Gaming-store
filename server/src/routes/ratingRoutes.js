const { Router } = require("express");
const {
  getProductsWithRatingsHandler,
  getUsersWithRatingsHandler,
  getUserRatingsHandler,
  getProductRatingsHandler,
  addRatingHandler,
  deleteRatingHandler,
  editRatingHandler,
} = require("../handlers/ratingsHandler");

const ratingsRoutes = Router();

ratingsRoutes.get("/products", getProductsWithRatingsHandler);
ratingsRoutes.get("/users", getUsersWithRatingsHandler);
ratingsRoutes.get("/user/:userId", getUserRatingsHandler);
ratingsRoutes.get("/product/:productId", getProductRatingsHandler);

ratingsRoutes.post("/add", addRatingHandler);
ratingsRoutes.patch("/edit", editRatingHandler);
ratingsRoutes.delete("/delete", deleteRatingHandler);

module.exports = ratingsRoutes;
