const { Router } = require("express");
const {
  patchChangeUserRoleHandler,
  deleteUserHandler,
  deleteProductHandler,
} = require("../handlers/superAdminHandler");

const superAdminRouter = Router();

superAdminRouter.patch("/user/changerole/:userId", patchChangeUserRoleHandler);
superAdminRouter.delete("/user/delete/:userId", deleteUserHandler);
superAdminRouter.delete("/product/delete/:productId", deleteProductHandler);

module.exports = superAdminRouter;
