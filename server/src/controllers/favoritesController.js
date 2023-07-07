const { Favorite } = require("../database.js");

const addFavorite = async (userId, productId) => {
  const existingFavorite = await Favorite.findOne({
    where: { userId, productId },
  });

  if (existingFavorite) {
    throw new Error("The product is already in favorites");
  }

  const newFavorite = await Favorite.create({ userId, productId });

  return newFavorite;
};

const deleteFavorite = async (userId, productId) => {
  const existingFavorite = await Favorite.findOne({
    where: { userId, productId },
  });

  if (!existingFavorite) {
    throw new Error("The product is not in favorites");
  }

  await existingFavorite.destroy();

  return;
};

const getFavoritesByUser = async (userId) => {
  const favorites = await Favorite.findAll({
    where: { userId },
  });

  return favorites;
};

module.exports = {
  addFavorite,
  deleteFavorite,
  getFavoritesByUser,
};
