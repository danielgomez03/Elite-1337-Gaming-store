const { Product, Image, Category } = require('../database');
const { Op } = require('sequelize');

const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Image,
          attributes: ['imageId', 'url', 'caption'],
        },
        {
          model: Category,
          attributes: ['categoryId', 'name'],
        },
      ],
        order: [['name', 'asc']],
    });

    return products;
  
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    throw new Error('An error occurred while retrieving the products');
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
      include: [
        {
          model: Image,
          attributes: ['imageId', 'url', 'caption'],
        },
        {
          model: Category,
          attributes: ['categoryId', 'name'],
        },
      ],
    });

    return products;

  } catch (error) {
    console.error('Error en getProductsByName:', error);
    throw new Error('An error occurred while retrieving the products by name');
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
          attributes: ['imageId', 'url', 'caption'],
        },
        {
          model: Category,
          attributes: ['categoryId', 'name'],
        },
      ],
    });

    if (!product) {
      throw new Error('Product not found');
    };

    return product;

  } catch (error) {
    console.error('Error in getProductById:', error);
    throw new Error('An error occurred while retrieving the products by ID');
  };
};

module.exports = {
    getAllProducts,
    getProductsByName,
    getProductById,
};