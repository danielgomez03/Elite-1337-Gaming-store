const {
  getProductsWithRatings,
  getUsersWithRatings,
  getUserRatings,
  getProductRatings,
  addRating,
  editRating,
  deleteRating,
} = require("../controllers/ratingsController");

// Get all products that have at least one rating
const getProductsWithRatingsHandler = async (req, res) => {
  try {
    const products = await getProductsWithRatings();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error in getProductsWithRatingsHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all users that have at least one rating
const getUsersWithRatingsHandler = async (req, res) => {
  try {
    const users = await getUsersWithRatings();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getUsersWithRatingsHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get a user's ratings by userId
const getUserRatingsHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await getUserRatings(userId);
    res.status(200).json({ ratings });
  } catch (error) {
    console.error("Error in getUserRatingsHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get a product's ratings by productId
const getProductRatingsHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const ratings = await getProductRatings(productId);
    res.status(200).json({ ratings });
  } catch (error) {
    console.error("Error in getProductRatingsHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

// Add a rating for a user and product
const addRatingHandler = async (req, res) => {
  try {
    const { userId, productId, value } = req.body;
    const rating = await addRating(userId, productId, value);
    res.status(200).json({ message: "Rating added successfully", rating });
  } catch (error) {
    console.error("Error in addRatingHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

// Edit a rating
const editRatingHandler = async (req, res) => {
  try {
    const { userId, productId, value } = req.body;
    const rating = await editRating(userId, productId, value);
    res.status(200).json({ message: "Rating updated successfully", rating });
  } catch (error) {
    console.error("Error in editRatingHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a rating for a product
const deleteRatingHandler = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await deleteRating(userId, productId);
    res.status(200).json({ message: "Rating deleted successfully" });
  } catch (error) {
    console.error("Error in deleteRatingHandler:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProductsWithRatingsHandler,
  getUsersWithRatingsHandler,
  getUserRatingsHandler,
  getProductRatingsHandler,
  addRatingHandler,
  editRatingHandler,
  deleteRatingHandler,
};
