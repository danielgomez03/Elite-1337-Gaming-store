const { Router } = require('express');
const { getUsers, getUserByIdHandler, postCreateUser, } = require('../handlers/usersHandler');

const usersRoutes = Router();

usersRoutes.get("/", getUsers);
usersRoutes.get("/:userId", getUserByIdHandler);

usersRoutes.post("/", postCreateUser);

module.exports = usersRoutes;