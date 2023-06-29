const { Router } = require("express");
const {
  getProducts,
  getProductByIdHandler,
  getProductsByNameAndDescriptionHandler,
  getProductsByOriginHandler,
  getProductsByManufacturerHandler,
  postCreateProduct,
  putUpdateProduct,
} = require("../handlers/productsHandler");

const productsRoutes = Router();

productsRoutes.get("/", getProducts); // <--- seach by name or if !name, get all
productsRoutes.get("/id/:productId", getProductByIdHandler);
productsRoutes.get("/description", getProductsByNameAndDescriptionHandler); // <--- search in name and description
productsRoutes.get("/origin/:origin", getProductsByOriginHandler);
productsRoutes.get(
  "/manufacturer/:manufacturer",
  getProductsByManufacturerHandler,
);

productsRoutes.post("/create", postCreateProduct);
productsRoutes.put("/edit/:productId", putUpdateProduct);

module.exports = productsRoutes;
