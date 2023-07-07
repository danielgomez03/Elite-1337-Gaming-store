const { Router } = require("express");
const {
  getFavoritesByUserHandler,
  addFavoriteHandler,
  deleteFavoriteHandler,
} = require("../handlers/favoritesHandler");

const favoritesRoutes = Router();

favoritesRoutes.get("/:userId", getFavoritesByUserHandler);
favoritesRoutes.post("/add", addFavoriteHandler);
favoritesRoutes.delete("/delete/:userId/:productId", deleteFavoriteHandler);

module.exports = favoritesRoutes;
