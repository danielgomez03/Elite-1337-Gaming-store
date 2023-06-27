const { Product, Image, Category } = require('../database');
const { Op } = require('sequelize');

const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      include: [ // Only includes two parent branches. A better implementation is necessary, like recursion
        {
          model: Image,
          attributes: ['imageId', 'url', 'caption'],
        },
        {
          model: Category,
          as: 'category',
          include: [
            {
              model: Category,
              as: 'parent',
              attributes: ['categoryId', 'name'],
              include: [
                {
                  model: Category,
                  as: 'parent',
                  attributes: ['categoryId', 'name'],
                },
              ],
            },
          ],
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
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Image,
          attributes: ['imageId', 'url', 'caption'],
        },
        {
          model: Category,
          as: 'category',
          include: [
            {
              model: Category,
              as: 'parent',
              attributes: ['categoryId', 'name'],
              include: [
                {
                  model: Category,
                  as: 'parent',
                  attributes: ['categoryId', 'name'],
                },
              ],
            },
          ],
          attributes: ['categoryId', 'name'],
        },
      ],
    });

    return products;
  } catch (error) {
    console.error('Error in getProductsByName:', error);
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
          as: 'category',
          include: [
            {
              model: Category,
              as: 'parent',
              attributes: ['categoryId', 'name'],
              include: [
                {
                  model: Category,
                  as: 'parent',
                  attributes: ['categoryId', 'name'],
                },
              ],
            },
          ],
          attributes: ['categoryId', 'name'],
        },
      ],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    console.error('Error in getProductById:', error);
    throw new Error('An error occurred while retrieving the product by ID');
  }
};

module.exports = {
  getAllProducts,
  getProductsByName,
  getProductById,
};