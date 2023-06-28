const { Router } = require("express");
const {
  getAllImagesHandler,
  getImageByIdHandler,
  getImagesByCaptionsHandler,
  getImagesByUsersHandler,
  getImagesByProductsHandler,
} = require("../handlers/imagesHandler");

const imagesRoutes = Router();

imagesRoutes.get("/", getAllImagesHandler);
imagesRoutes.get("/id/:imageId", getImageByIdHandler);
imagesRoutes.get("/captions", getImagesByCaptionsHandler);
imagesRoutes.get("/users", getImagesByUsersHandler);
imagesRoutes.get("/products", getImagesByProductsHandler);

module.exports = imagesRoutes;
