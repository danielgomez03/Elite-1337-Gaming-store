const { conn, User, Product, Image } = require('../database');
const {
    getAllImages,
    getImageById,
    getImagesByCaptions,
    getImagesByUsers,
    getImagesByProducts,
} = require('../controllers/imagesController');
  
const getAllImagesHandler = async (req, res) => {
  try {
    const images = await getAllImages();
    res.json(images);
  } catch (error) {
    console.error('Error in getAllImagesHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving all images' });
  }
};

const getImageByIdHandler = async (req, res) => {
  const { imageId } = req.params;
  try {
    const image = await getImageById(imageId);
    res.json(image);
  } catch (error) {
    console.error('Error in getImageByIdHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the image by ID' });
  }
};

const getImagesByCaptionsHandler = async (req, res) => {
  const { caption } = req.query;
  try {
    const images = await getImagesByCaptions(caption);
    res.json(images);
  } catch (error) {
    console.error('Error in getImagesByCaptionsHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving images with caption' });
  }
};

const getImagesByUsersHandler = async (req, res) => {
  try {
    const images = await getImagesByUsers();
    res.json(images);
  } catch (error) {
    console.error('Error in getImagesByUsersHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user images' });
  }
};

const getImagesByProductsHandler = async (req, res) => {
  try {
    const images = await getImagesByProducts();
    res.json(images);
  } catch (error) {
    console.error('Error in getImagesByProductsHandler:', error);
    res.status(500).json({ error: 'An error occurred while retrieving product images' });
  }
};
  
module.exports = {
  getAllImagesHandler,
  getImageByIdHandler,
  getImagesByCaptionsHandler,
  getImagesByUsersHandler,
  getImagesByProductsHandler,
};  