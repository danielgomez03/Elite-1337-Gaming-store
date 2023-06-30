const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const usersRoutes = require("./usersRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");
const stripeRoutes = require("./stripeRoutes");

const router = Router();

router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/users", usersRoutes);
router.use("/carts", cartRoutes);
router.use("/images", imagesRoutes);
router.use("/stripe", stripeRoutes);

module.exports = router;
