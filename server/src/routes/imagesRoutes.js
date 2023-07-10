const { Router } = require("express");
const {
  getAllImagesHandler,
  getImageByIdHandler,
  getImagesByCaptionsHandler,
  getImagesByUsersHandler,
  getImagesByProductsHandler,
  postImageUploadHandler,
} = require("../handlers/imagesHandler");
const { productUploads, userUploads } = require("../config/multer");

const imagesRoutes = Router();

imagesRoutes.get("/", getAllImagesHandler);
imagesRoutes.get("/id/:imageId", getImageByIdHandler); // <--- get image by id
imagesRoutes.get("/captions", getImagesByCaptionsHandler); // <--- images that contain captions
imagesRoutes.get("/users", getImagesByUsersHandler); // <--- users with profile pic uploaded
imagesRoutes.get("/products", getImagesByProductsHandler); // <--- get all products with images

imagesRoutes.post(
  "/products/uploads",
  productUploads.single("images"),
  postImageUploadHandler,
);

imagesRoutes.post(
  "/users/uploads",
  userUploads.single("image"),
  postImageUploadHandler,
);

module.exports = imagesRoutes;
