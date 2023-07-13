const {
  addFavorite,
  deleteFavorite,
  getFavoritesByUser,
} = require("../controllers/favoritesController");

const addFavoriteHandler = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const newFavorite = await addFavorite(userId, productId);
    res.status(200).json(newFavorite);
  } catch (error) {
    console.error("Error in addFavoriteHandler:", error);
    res.status(500).json({ message: "Error adding the product to favorites" });
  }
};

const deleteFavoriteHandler = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await deleteFavorite(userId, productId);
    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    console.error("Error in deleteFavoriteHandler:", error);
    res
      .status(500)
      .json({ message: "Error deleting the product from favorites" });
  }
};

const getFavoritesByUserHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await getFavoritesByUser(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error in getFavoritesByUserHandler:", error);
    res.status(500).json({ message: "Error retrieving favorite products" });
  }
};

module.exports = {
  addFavoriteHandler,
  deleteFavoriteHandler,
  getFavoritesByUserHandler,
};
