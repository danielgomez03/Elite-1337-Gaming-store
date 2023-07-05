const { Cart, User, Product, Category, Sequelize } = require("../database");
const { Op } = require("sequelize");

const getCartByUserId = async (userId) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: userId,
      },
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
        {
          model: Product,
          attributes: ["name", "price", "discount", "stock"],
        },
      ],
    });

    if (!cart) {
      throw new Error("Cart not found for the given user");
    }

    return cart;
  } catch (error) {
    console.error("Error in getCartByUserId:", error);
    throw new Error("Failed to retrieve the cart for the given user");
  }
};

// const getCartByUserId = async (userId) => {
//   try {
//     const cart = await User.findAll({
//       where: {
//         userId: userId,
//       },
//       attributes: ["userId"],
//       include: [
//         {
//           model: Cart,
//         },
//       ],
//     });

//     if (!cart) {
//       throw new Error("Cart not found for the given user");
//     }

//     return cart;
//   } catch (error) {
//     console.error("Error in getCartByUserId:", error);
//     throw new Error("Failed to retrieve the cart for the given user");
//   }
// };

const getCartsByUserName = async (name) => {
  try {
    const carts = await Cart.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
          where: {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${name}%` } },
              { lastName: { [Op.iLike]: `%${name}%` } },
            ],
          },
        },
        {
          model: Product,
          attributes: ["name", "price", "discount", "stock"],
        },
      ],
    });

    return carts;
  } catch (error) {
    console.error("Error in getCartsByUserName:", error);
    throw new Error("Failed to retrieve the carts for the given user name");
  }
};

const getCartByProductId = async (productId) => {
  try {
    const cart = await Cart.findOne({
      where: {
        productId: productId,
      },
      include: [
        {
          model: Product,
          attributes: ["name", "price", "discount", "stock"],
        },
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    if (!cart) {
      throw new Error("Cart not found for the given product");
    }

    return cart;
  } catch (error) {
    console.error("Error in getCartByProductId:", error);
    throw new Error("Failed to retrieve the cart for the given product");
  }
};

const getCartsByProductName = async (name) => {
  try {
    const carts = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: ["name", "price", "discount", "stock"],
          where: {
            name: { [Op.iLike]: `%${name}%` },
          },
        },
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    });

    return carts;
  } catch (error) {
    console.error("Error in getCartsByProductName:", error);
    throw new Error("Failed to retrieve the carts for the given product name");
  }
};

const getProductsInCarts = async () => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["origin", "createdAt", "updatedAt", "isActive"] },
      include: [
        {
          model: Cart,
          as: "carts",
          attributes: ["cartId", "quantity"],
          include: [
            {
              model: User,
              attributes: ["userId", "firstName", "lastName"],
            },
          ],
          where: {
            quantity: { [Op.gt]: 0 }, // Filter carts with quantity > 0
          },
          required: true, // Filter products with associated carts
        },
      ],
      order: [["name", "asc"]],
    });

    return products;
  } catch (error) {
    console.error("Error in getProductsInCarts:", error);
    throw new Error("Failed to retrieve the products in carts");
  }
};

const getUsersWithActiveCarts = async () => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "firstName", "lastName"],
      include: [
        {
          model: Cart,
          include: [
            {
              model: Product,
              attributes: {
                exclude: [
                  "description",
                  "manufacturer",
                  "origin",
                  "createdAt",
                  "updatedAt",
                  "isActive",
                ],
              },
            },
          ],
          required: true, // Include only users with carts
        },
      ],
    });

    return users;
  } catch (error) {
    console.error("Error in getUsersWithActiveCarts:", error);
    throw new Error("Failed to retrieve users with active carts");
  }
};

const addProductToCart = async (userId, productId, quantity) => {
  try {
    // Check if a cart entry already exists for the user and product
    const existingCart = await Cart.findOne({
      where: { userId: userId, productId: productId },
    });

    if (existingCart) {
      // Update the quantity of the existing cart entry
      existingCart.quantity += quantity;
      await existingCart.save();
      return existingCart;
    } else {
      // Create a new cart entry
      const cart = await Cart.create({
        userId: userId,
        productId: productId,
        quantity: quantity,
      });
      return cart;
    }
  } catch (error) {
    console.error("Error in addProductToCart:", error);
    throw new Error("Failed to add the product to the cart");
  }
};

const editCartProductQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found for the given user and product");
    }

    if (quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    cart.quantity = quantity;
    await cart.save();

    return cart;
  } catch (error) {
    console.error("Error in editCartProductQuantity:", error);
    throw new Error("Failed to edit the cart product quantity");
  }
};

const removeProductFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (!cart) {
      throw new Error("Cart not found for the given user and product");
    }

    await cart.destroy();
  } catch (error) {
    console.error("Error in removeProductFromCart:", error);
    throw new Error("Failed to remove the product from the cart");
  }
};

module.exports = {
  getCartByUserId,
  getCartsByUserName,
  getCartByProductId,
  getCartsByProductName,
  getProductsInCarts,
  getUsersWithActiveCarts,
  addProductToCart,
  editCartProductQuantity,
  removeProductFromCart,
};
