const { Router } = require("express");

const commentsRoutes = require("./commentsRoutes")

const productsRoutes = require("./productsRoutes");
const usersRoutes = require("./usersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");
const stripeRoutes = require("./stripeRoutes");
const loginRoutes = require("./loginRoutes");
const newsletterRoutes = require("./newsletterRoutes");
const ordersRoutes = require("./orderRoutes");
const ratingsRoutes = require("./ratingRoutes");
const favoritesRoutes = require("./favoritesRoutes")

const router = Router();
router.use("/comments",commentsRoutes)
router.use("/products", productsRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/carts", cartRoutes);
router.use("/images", imagesRoutes);
router.use("/stripe", stripeRoutes);
router.use("/login", loginRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/orders", ordersRoutes);
router.use("/ratings", ratingsRoutes);
router.use("/favorites", favoritesRoutes);

module.exports = router;
