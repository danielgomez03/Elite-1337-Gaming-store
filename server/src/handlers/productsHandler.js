const { conn, Product, Image, Category } = require('../database');
const { getAllProducts, getProductsByName, getProductById } = require("../controllers/productsController");

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

const postCreateProduct = async (req, res) => {
    
  try {

      const { productId, name, description, manufacturer, origin, price, discount,
          stock, isActive, category, images } = req.body;

      const product = await Product.create({
          productId,
          name,
          description,
          manufacturer,
          origin,
          price,
          discount,
          stock,
          isActive,
      });

      const categoryDb = [category];
      for (const category of categoryDb) {
          const categoryDb2 = await Category.findOne({ where: { name: category.name } });
          if (!categoryDb2) {
              return res.status(400).json({ message: 'Category does not exist' });
          }
          if (category.subcategories && category.subcategories.length > 0) {
              const categoryDb3 = await Category.findOne({ where: { name: category.subcategories.name } });
              if (!categoryDb3) {
                  return res.status(400).json({ message: 'Category does not exist' });
              }
          }  
      }
      await product.addCategories(categoryDb);           

      const imagesDb = await Promise.all(images.map(async (image) => {
          const { url, publicId } = image;
          const imageDb = await Image.create({ url, publicId });
          return imageDb;
      }));
      
      await product.addImages(imagesDb);
     
      res.status(200).json({ message: 'Product created successfully', product });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getProducts,
    getProductByIdHandler,
    postCreateProduct,
};