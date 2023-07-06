const { Favorite } = require("../database.js");

// Añadir un producto a favoritos
async function addFavorite(req, res) {
  try {
    const { userId, productId } = req.body;

    // Verificar si el producto ya está en favoritos del usuario
    const existingFavorite = await Favorite.findOne({
      where: { userId, productId },
    });

    if (existingFavorite) {
      return res.status(409).json({ message: "El producto ya está en favoritos" });
    }

    // Crear un nuevo registro de favorito
    const newFavorite = await Favorite.create({ userId, productId });

    return res.status(200).json(newFavorite);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al añadir el producto a favoritos" });
  }
}

// Borrar un producto de favoritos
async function deleteFavorite(req, res) {
  try {
    const { userId, productId } = req.params;

    // Verificar si el producto está en favoritos del usuario
    const existingFavorite = await Favorite.findOne({
      where: { userId, productId },
    });

    if (!existingFavorite) {
      return res.status(404).json({ message: "El producto no está en favoritos" });
    }

    // Eliminar el registro de favorito
    await existingFavorite.destroy();

    return res.status(200).json({ message: "Producto eliminado de favoritos" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el producto de favoritos" });
  }
}

// Buscar productos favoritos por usuario
async function getFavoritesByUser(req, res) {
  try {
    const { userId } = req.params;

    // Buscar los productos favoritos del usuario
    const favorites = await Favorite.findAll({
      where: { userId },
    });

    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener los productos favoritos" });
  }
}

module.exports = {
  addFavorite,
  deleteFavorite,
  getFavoritesByUser,
};