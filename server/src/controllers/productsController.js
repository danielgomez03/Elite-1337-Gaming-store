const { Product, Image, Category } = require("../database");
const { Op } = require("sequelize");
const { getParentCategories } = require("./categoriesController");

const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Image,
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
      order: [["name", "asc"]],
    });

    return products;
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    throw new Error("An error occurred while retrieving the products");
  }
};

const getProductsByName = async (name) => {
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Image,
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
      order: [["name", "asc"]],
    });

    return products;
  } catch (error) {
    console.error("Error in getProductsByName:", error);
    throw new Error("An error occurred while retrieving the products by name");
  }
};

const getProductsByNameAndDescription = async (name) => {
  try {
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${name}%` } },
          { description: { [Op.iLike]: `%${name}%` } },
        ],
      },
      include: [
        {
          model: Image,
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
      order: [["name", "asc"]],
    });

    return products;
  } catch (error) {
    console.error("Error in getProductsByName:", error);
    throw new Error("An error occurred while retrieving the products by name");
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findOne({
      where: {
        productId: productId,
      },
      include: [
        {
          model: Image,
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw new Error("An error occurred while retrieving the product by ID");
  }
};

const getProductsByManufacturer = async (manufacturer) => {
  try {
    const products = await Product.findAll({
      where: {
        manufacturer: {
          [Op.iLike]: `%${manufacturer}%`,
        },
      },
      include: [
        {
          model: Image,
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
      order: [["name", "asc"]],
    });

    return products;
  } catch (error) {
    console.error("Error in getProductsByManufacturer:", error);
    throw new Error(
      "An error occurred while retrieving the products by manufacturer",
    );
  }
};

const getProductsByOrigin = async (origin) => {
  try {
    const products = await Product.findAll({
      where: {
        origin: {
          [Op.iLike]: `%${origin}%`,
        },
      },
      include: [
        {
          model: Image,
          attributes: ["imageId", "url", "caption"],
        },
        {
          model: Category,
          as: "category",
          include: [getParentCategories],
          attributes: ["categoryId", "name"],
        },
      ],
      order: [["name", "asc"]],
    });

    return products;
  } catch (error) {
    console.error("Error in getProductsByOrigin:", error);
    throw new Error(
      "An error occurred while retrieving the products by origin",
    );
  }
};

module.exports = {
  getAllProducts,
  getProductsByName,
  getProductsByNameAndDescription,
  getProductById,
  getProductsByManufacturer,
  getProductsByOrigin,
};
