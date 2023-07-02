const { Router } = require("express");
const { login, logout, getSession } = require("../handlers/loginHandler");

const loginRoutes = Router();

loginRoutes.post("/signin", login);
loginRoutes.post("/signout", logout);
loginRoutes.get("/session", getSession);

module.exports = loginRoutes;
