const { Router } = require("express");
const { login } = require("../handlers/loginHandler");

const loginRoutes = Router();

loginRoutes.post("/signin", login);

module.exports = loginRoutes;
