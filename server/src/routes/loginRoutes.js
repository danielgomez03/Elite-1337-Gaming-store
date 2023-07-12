const { Router } = require("express");
const { login, persistSession, logout, googleLogin, googleCallback } = require("../handlers/loginHandler");

const loginRoutes = Router();

loginRoutes.post("/signin", login);
loginRoutes.get("/tokens", persistSession);
loginRoutes.post("/signout", logout);
loginRoutes.get("/google", googleLogin);
loginRoutes.get("/callbackGoogle", googleCallback);

module.exports = loginRoutes;
