const { Router } = require("express");
const {
  getDisabledUsersHandler,
  patchDisableUserHandler,
  patchEnableUserHandler,

  patchProductHandler,
  patchProductStatusHandler,
 
} = require("../handlers/adminHandler");

const adminRouter = Router();

adminRouter.get("/users/disabled", getDisabledUsersHandler);
adminRouter.patch("/user/disable", patchDisableUserHandler);
adminRouter.patch("/user/enable", patchEnableUserHandler);
adminRouter.patch("/product/edit/status", patchProductStatusHandler);

adminRouter.patch("/product/edit", patchProductHandler);


module.exports = adminRouter;
