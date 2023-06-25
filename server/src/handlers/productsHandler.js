const { getAllProducts, getProductsByName } = require("../controllers/productsController");
const { getProductById } = require("../controllers/productsController");

const getProducts = async (req, res) => {
  const { name } = req.query;
  try {
    let Products
    if(name){
      Products = await getProductsByName(name);
    } else {
      Products = await getAllProducts()
    }
    res.status(200).json(Products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in the server" });
  }
};

const getProductByIdHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error en getProductByIdHandler:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener el producto por ID" });
  }
};

module.exports = {
    getProducts,
    getProductByIdHandler
};