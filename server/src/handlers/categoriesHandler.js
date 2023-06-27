const { Category } = require('../database');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json('Error retrieving categories');
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json(`The category with the id ${categoryId} does not exist`);
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error retrieving category:', error);
    return res.status(500).json('Error retrieving category');
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};
