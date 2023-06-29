const {
  getCartByUserId,
  getCartsByUserName,
  getCartByProductId,
  getCartsByProductName,
  getProductsInCarts,
  getUsersWithActiveCarts,
  addProductToCart,
  removeProductFromCart,
  editCartProductQuantity,
} = require("../controllers/cartControllers");

const getCartByUserIdHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found for the given user" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error in getCartByUserIdHandler:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve the cart for the given user" });
  }
};

const getCartsByUserNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const carts = await getCartsByUserName(name);
    res.json(carts);
  } catch (error) {
    console.error("Error in getCartsByUserNameHandler:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve the carts for the given user name" });
  }
};

const getCartByProductIdHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await getCartByProductId(productId);
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found for the given product" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error in getCartByProductIdHandler:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve the cart for the given product" });
  }
};

const getCartsByProductNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const carts = await getCartsByProductName(name);
    res.json(carts);
  } catch (error) {
    console.error("Error in getCartsByProductNameHandler:", error);
    res
      .status(500)
      .json({
        error: "Failed to retrieve the carts for the given product name",
      });
  }
};

const getProductsInCartsHandler = async (req, res) => {
  try {
    const products = await getProductsInCarts();
    res.json(products);
  } catch (error) {
    console.error("Error in getProductsInCartsHandler:", error);
    res.status(500).json({ error: "Failed to retrieve the products in carts" });
  }
};

const getUsersWithActiveCartsHandler = async (req, res) => {
  try {
    const users = await getUsersWithActiveCarts();
    res.json(users);
  } catch (error) {
    console.error("Error in getUsersWithActiveCartsHandler:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve the users with active carts" });
  }
};

const addProductToCartHandler = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await addProductToCart(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    console.error("Error in addProductToCartHandler:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

const editCartProductQuantityHandler = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await editCartProductQuantity(userId, productId, quantity);
    if (!cart) {
      return res
        .status(404)
        .json({ error: "Cart not found for the given user or product" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error in editCartProductQuantityHandler:", error);
    res.status(500).json({ error: "Failed to edit cart product quantity" });
  }
};

const removeProductFromCartHandler = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await removeProductFromCart(userId, productId);
    if (result === 0) {
      return res
        .status(404)
        .json({ error: "Cart not found for the given user or product" });
    }
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error in removeProductFromCartHandler:", error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

module.exports = {
  getCartByUserIdHandler,
  getCartsByUserNameHandler,
  getCartByProductIdHandler,
  getCartsByProductNameHandler,
  getProductsInCartsHandler,
  getUsersWithActiveCartsHandler,
  addProductToCartHandler,
  editCartProductQuantityHandler,
  removeProductFromCartHandler,
};
