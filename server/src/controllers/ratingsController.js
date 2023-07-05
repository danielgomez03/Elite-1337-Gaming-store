const { User, Product, Rating } = require("../database");
const { Op } = require("sequelize");

// Get all products that have at least one rating
const getProductsWithRatings = async () => {
  try {
    const products = await Product.findAll({
      attributes: ["productId", "name"],
      include: [
        {
          model: Rating,
          attributes: ["userId", "value", "createdAt"],
          required: true,
        },
      ],
      where: {
        "$ratings.ratingId$": { [Op.ne]: null },
      },
    });

    return products;
  } catch (error) {
    console.error("Error in getProductsWithRatings:", error);
    throw error;
  }
};

// Get all users that have at least one rating
const getUsersWithRatings = async () => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "firstName", "lastName"],
      include: [
        {
          model: Rating,
          attributes: ["productId", "value", "createdAt"],
          required: true,
        },
      ],
      where: {
        "$ratings.ratingId$": { [Op.ne]: null },
      },
    });

    return users;
  } catch (error) {
    console.error("Error in getUsersWithRatings:", error);
    throw error;
  }
};

// Get a user's ratings by userId
const getUserRatings = async (userId) => {
  try {
    const ratings = await Rating.findAll({
      attributes: ["ratingId", "productId", "value", "createdAt"],
      where: { userId },
    });

    return ratings;
  } catch (error) {
    console.error("Error in getUserRatings:", error);
    throw error;
  }
};

// Get a product's ratings by productId
const getProductRatings = async (productId) => {
  try {
    const ratings = await Rating.findAll({
      attributes: ["ratingId", "userId", "value", "createdAt"],
      where: { productId },
    });

    return ratings;
  } catch (error) {
    console.error("Error in getProductRatings:", error);
    throw error;
  }
};

// Add a rating for a user and product
const addRating = async (userId, productId, value) => {
  try {
    // Check if the user and product exist
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      throw new Error("User or product not found");
    }

    // Check if the user has already rated the product
    const existingRating = await Rating.findOne({
      where: { userId, productId },
    });

    if (existingRating) {
      throw new Error("User has already rated the product");
    }

    // Create the rating
    const rating = await Rating.create({
      userId,
      productId,
      value,
    });

    return rating;
  } catch (error) {
    console.error("Error in addRating:", error);
    throw error;
  }
};

// Edit a rating
const editRating = async (userId, productId, value) => {
  try {
    // Find the rating by its associated User and Product
    const rating = await Rating.findOne({
      where: { userId, productId },
    });

    if (!rating) {
      throw new Error("Rating not found");
    }

    rating.value = value;
    await rating.save();

    return rating;
  } catch (error) {
    console.error("Error in editRating:", error);
    throw error;
  }
};

// Delete a rating for a product
const deleteRating = async (userId, productId) => {
  try {
    // Find the rating by its associated User and Product
    const rating = await Rating.findOne({
      where: { userId, productId },
    });

    if (!rating) {
      throw new Error("Rating not found");
    }
    await rating.destroy();
  } catch (error) {
    console.error("Error in deleteRating:", error);
    throw error;
  }
};

module.exports = {
  getProductsWithRatings,
  getUsersWithRatings,
  getUserRatings,
  getProductRatings,
  addRating,
  editRating,
  deleteRating,
};
