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
imagesRoutes.get("/id/:imageId", getImageByIdHandler); // <--- get image by id
imagesRoutes.get("/captions", getImagesByCaptionsHandler); // <--- images that contain captions
imagesRoutes.get("/users", getImagesByUsersHandler); // <--- users with profile pic uploaded
imagesRoutes.get("/products", getImagesByProductsHandler); // <--- get all products with images

module.exports = imagesRoutes;
