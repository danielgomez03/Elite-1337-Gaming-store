const createCategories = require('../controllers/categoriesController');
const categories = require('../data/categories');

let allCategories = null; // Declare a variable to store all categories

const getAllCategories = async (req, res) => {
  try {
    if (!allCategories) {
      allCategories = await createCategories(categories);
    }

    res.status(200).json(allCategories);
  
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json('Error retrieving categories');
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!allCategories) {
      allCategories = await createCategories(categories);
    }

    const findCategory = allCategories.find(category => category.categoryId.toString() === id);

    if (!findCategory) {
      return res.status(404).json(`The category with the id ${id} does not exist`);
    }

    return res.status(200).json(findCategory);

  } catch (error) {
    console.error('Error retrieving category:', error);
    return res.status(500).json('Error retrieving category');
  }
};

module.exports = { 
  getAllCategories, 
  getCategoryById,
};