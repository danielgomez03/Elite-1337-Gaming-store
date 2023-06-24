const { Product, Image} = require("../database");
const { Op } = require("sequelize");

const getAllProducts = async () => {
    try {
      const products = await Product.findAll({
        include: {
            model: Image,
            attributes: ["imageId", "url"],
          },
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

module.exports = {
    getAllProducts,
    getProductsByName,
};
