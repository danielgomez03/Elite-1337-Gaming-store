const { Router } = require("express");
const {
  patchChangeUserRoleHandler,
  deleteUserHandler,
  deleteProductHandler,
  deleteRatingHandler,
  deleteCommentHandler,
} = require("../handlers/superAdminHandler");

const superAdminRouter = Router();

superAdminRouter.patch("/user/changerole/:userId", patchChangeUserRoleHandler);
superAdminRouter.delete("/user/delete/:userId", deleteUserHandler);
superAdminRouter.delete("/product/delete/:productId", deleteProductHandler);
superAdminRouter.delete("/rating/delete/:ratingId", deleteRatingHandler);
superAdminRouter.delete("/comment/delete/:commentId", deleteCommentHandler);

module.exports = superAdminRouter;
