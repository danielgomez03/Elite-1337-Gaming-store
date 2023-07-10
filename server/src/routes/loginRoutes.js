const { Router } = require("express");
const { login, persistSession, logout } = require("../handlers/loginHandler");

const loginRoutes = Router();

loginRoutes.post("/signin", login);
loginRoutes.get("/tokens", persistSession);
loginRoutes.post("/signout", logout);

module.exports = loginRoutes;