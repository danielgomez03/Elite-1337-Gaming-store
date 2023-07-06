const { Router } = require("express");
const multer = require("multer");
const path = require("path");
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

// Configure the multer storage engine and upload instance
const storage = multer.diskStorage({
  destination: "../server/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = path.extname(file.originalname);
    const fileName = `image-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

usersRoutes.get("/", getUsers);
usersRoutes.get("/id/:userId", getUserByIdHandler);

usersRoutes.post("/register", postCreateUser);
usersRoutes.put("/profile/edit/:userId", putUpdateUser);
usersRoutes.patch("/profile/editemail/:userId", patchUpdateEmail);
usersRoutes.patch("/profile/editpassword/:userId", patchUpdatePassword);
usersRoutes.patch(
  "/profile/editimage/:userId",
  upload.single("image"),
  patchUpdateUserImage,
);

module.exports = usersRoutes;
