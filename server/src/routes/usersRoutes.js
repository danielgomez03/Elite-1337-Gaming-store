const { Router } = require("express");
const {
  getUsers,
  getUserByIdHandler,
  postCreateUser,
  putUpdateUser,
} = require("../handlers/usersHandler");

const usersRoutes = Router();

usersRoutes.get("/", getUsers);
usersRoutes.get("/id/:userId", getUserByIdHandler);

usersRoutes.post("/register", postCreateUser);
usersRoutes.put("/profile/edit/:userId", putUpdateUser);

module.exports = usersRoutes;
