const { Router } = require("express");
const productsRoutes = require("./productsRoutes");
const usersRoutes = require("./usersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");
const stripeRoutes = require("./stripeRoutes");
const loginRoutes = require("./loginRoutes");
const newsletterRoutes = require("./newsletterRoutes");

const router = Router();

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/carts", cartRoutes);
router.use("/images", imagesRoutes);
router.use("/stripe", stripeRoutes);
router.use("/login", loginRoutes);
router.use("/newsletter", newsletterRoutes);

module.exports = router;
