const { getAllProducts, getProductsByName } = require("../controllers/productsController");

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

module.exports = {
    getProducts
};