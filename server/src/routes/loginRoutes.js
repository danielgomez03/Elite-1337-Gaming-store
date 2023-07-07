const { Router } = require("express");
const { login, getAllTokens, logout } = require("../handlers/loginHandler");

const loginRoutes = Router();

loginRoutes.post("/signin", login);
loginRoutes.get("/tokens", getAllTokens);
loginRoutes.post("/signout", logout);

module.exports = loginRoutes;
