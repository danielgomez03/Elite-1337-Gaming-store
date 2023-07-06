const { Router } = require("express");
const {
  getDisabledUsersHandler,
  patchDisableUserHandler,
  patchEnableUserHandler,
} = require("../handlers/adminHandler");

const adminRouter = Router();

adminRouter.get("/users/disabled", getDisabledUsersHandler);
adminRouter.patch("/user/disable", patchDisableUserHandler);
adminRouter.patch("/user/enable", patchEnableUserHandler);

module.exports = adminRouter;
