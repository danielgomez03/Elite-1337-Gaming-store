const { Router } = require("express");
const {
  getProductCommentsHandler,
  addCommentHandler,
  getCommentsAllProductsHandler,
  getUserCommentsHandler,
  deleteCommentHandler,
} = require("../handlers/commentsHandler");

const commentsRoutes = Router();

commentsRoutes.get("/products", getCommentsAllProductsHandler);
commentsRoutes.get("/user/:userId", getUserCommentsHandler);
commentsRoutes.get("/product/:productId", getProductCommentsHandler);
commentsRoutes.delete("/delete",deleteCommentHandler)
commentsRoutes.post("/add", addCommentHandler);

module.exports = commentsRoutes;