const { Image, User, Product } = require('../database');
const { Op } = require('sequelize');

const getAllImages = async () => {
  try {
    const images = await Image.findAll();
    return images;
  } catch (error) {
    console.error('Error in getAllImages:', error);
    throw new Error('An error occurred while retrieving all images');
  }
};

const getImageById = async (imageId) => {
  try {
    const image = await Image.findOne({
      where: {
        imageId: imageId,
      },
    });

    if (!image) {
      throw new Error('Image not found');
    }

    return image;
  } catch (error) {
    console.error('Error in getImageById:', error);
    throw new Error('An error occurred while retrieving the image by ID');
  }
};

const getImagesByCaptions = async () => {
  try {
    const images = await Image.findAll({
      where: {
        caption: {
          [Op.not]: null,
        },
      },
    });

    return images;
  } catch (error) {
    console.error('Error in getImagesByCaptions:', error);
    throw new Error('An error occurred while retrieving images with caption');
  }
};

const getImagesByUsers = async () => {
  try {
    const images = await Image.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
          where: {
            userId: { [Op.not]: null },
          },
        },
      ],
    });

    return images;
  } catch (error) {
    console.error('Error in getImagesByUsers:', error);
    throw new Error('An error occurred while retrieving user images');
  }
};

const getImagesByProducts = async () => {
  try {
    const images = await Image.findAll({
      include: [
        {
          model: Product,
          attributes: ['name'],
          where: {
            productId: { [Op.not]: null },
          },
        },
      ],
    });

    return images;
  } catch (error) {
    console.error('Error in getImagesByProducts:', error);
    throw new Error('An error occurred while retrieving product images');
  }
};

module.exports = {
  getAllImages,
  getImageById,
  getImagesByCaptions,
  getImagesByUsers,
  getImagesByProducts,
};