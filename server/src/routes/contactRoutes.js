const { Router } = require("express");
const {
  getAllContactsHandler,
  getUserContactHandler,
  postContactHandler,
} = require("../handlers/contactHandler");

const contactRoutes = Router();

contactRoutes.get("/all", getAllContactsHandler);
contactRoutes.get("/user/:userId", getUserContactHandler);

contactRoutes.post("/form", postContactHandler);

module.exports = contactRoutes;
