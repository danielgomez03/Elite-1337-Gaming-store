const { Router } = require("express");
const { userUploads } = require("../config/multer");
const {
  getUsers,
  getUserByIdHandler,
  postCreateUser,
  putUpdateUser,
  patchUpdateEmail,
  patchUpdatePassword,
  patchUpdateUserImage,
} = require("../handlers/usersHandler");

const usersRoutes = Router();

usersRoutes.get("/", getUsers);
usersRoutes.get("/id/:userId", getUserByIdHandler);

usersRoutes.post("/register", userUploads.single("image"), postCreateUser);
usersRoutes.put(
  "/profile/edit/:userId",
  userUploads.single("image"),
  putUpdateUser,
);
usersRoutes.patch("/profile/editemail/:userId", patchUpdateEmail);
usersRoutes.patch("/profile/editpassword/:userId", patchUpdatePassword);

usersRoutes.patch(
  "/profile/editimage/:userId",
  userUploads.single("image"),
  patchUpdateUserImage,
);

module.exports = usersRoutes;
