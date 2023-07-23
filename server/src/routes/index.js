const { Router } = require("express");
const { authenticateJWT } = require("../config/jwt");

const productsRoutes = require("./productsRoutes");
const usersRoutes = require("./usersRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const imagesRoutes = require("./imagesRoutes");
const cartRoutes = require("./cartRoutes");
const stripeRoutes = require("./stripeRoutes");
const loginRoutes = require("./loginRoutes");
const mailingRoutes = require("./mailingRoutes");
const ordersRoutes = require("./orderRoutes");
const ratingsRoutes = require("./ratingRoutes");
const adminRoutes = require("./adminRoutes");
const superAdminRoutes = require("./superAdminRoutes");
const commentsRoutes = require("./commentsRoutes");
const favoritesRoutes = require("./favoritesRoutes");
const saleHistoryRoutes = require("./saleHistoryRoutes");
const contactRoutes = require("./contactRoutes");

const router = Router();
// router.use(authenticateJWT);

router.use("/products", productsRoutes);
router.use("/users", usersRoutes);
router.use("/categories", categoriesRoutes);
router.use("/carts", cartRoutes);
router.use("/images", imagesRoutes);
router.use("/stripe", stripeRoutes);
router.use("/login", loginRoutes);
router.use("/mailing", mailingRoutes);
router.use("/orders", ordersRoutes);
router.use("/ratings", ratingsRoutes);
router.use("/admin", adminRoutes);
router.use("/superadmin", superAdminRoutes);
router.use("/comments", commentsRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/salehistory", saleHistoryRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
