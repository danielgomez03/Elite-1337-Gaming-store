const { Router } = require("express");
const favoriteController = require("../controllers/favoriteController");



const favoritesRoutes = Router();


favoritesRoutes.get('/:userId', favoriteController.getFavoritesByUser);
favoritesRoutes.post('/add', favoriteController.addFavorite);
favoritesRoutes.delete('/delete/:userId/:productId', favoriteController.deleteFavorite);

module.exports = favoritesRoutes;