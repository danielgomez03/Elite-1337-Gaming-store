const { Router } = require("express");
const {
  login,
  persistSession,
  logout,
  passwordReset,
} = require("../handlers/loginHandler");

const loginRoutes = Router();

loginRoutes.post("/signin", login);
loginRoutes.get("/tokens", persistSession);
loginRoutes.post("/signout", logout);
loginRoutes.post("/passwordreset", passwordReset);

module.exports = loginRoutes;
