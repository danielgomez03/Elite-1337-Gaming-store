const { Product, Image} = require("../database");
const { Op } = require("sequelize");

const getAllProducts = async () => {
    try {
      const products = await Product.findAll({
        include: {
            model: Image,
            attributes: ["imageId", "url"],
          },
          order: [["name", "ASC"]],
      });
      return products;
    } catch (error) {
      console.error("Error en getAllProducts:", error);
      throw new Error("Ocurrió un error al obtener los productos");
    }
  };

const getProductsByName = async (name) => {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        include: {
          model: Image,
          attributes: ["imageId", "url"],
        },
      });
      return products;
    } catch (error) {
      console.error("Error en getProductsByName:", error);
      throw new Error("Ocurrió un error al obtener los productos por nombre");
    }
  };
  const getProductById = async (productId) => {
    try {
      const product = await Product.findOne({
        where: {
          productId: productId,
        },
        include: {
          model: Image,
          attributes: ["imageId", "url"],
        },
      });
  
      if (!product) {
        // El producto no fue encontrado
        throw new Error("Producto no encontrado");
      }
  
      return product;
    } catch (error) {
      console.error("Error en getProductById:", error);
      throw new Error("Ocurrió un error al obtener el producto por ID");
    }
  };


module.exports = {
    getAllProducts,
    getProductsByName,
    getProductById
};
