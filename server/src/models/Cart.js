const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cart = sequelize.define(
    "cart",
    {
      cartId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [1],
            msg: "Quantity must be a positive number",
          },
        },
      },
    },
    { timestamps: false },
  );

  // Define a beforeSave hook to delete the cart entry if quantity is 0 or negative
  Cart.beforeSave(async (cart) => {
    if (cart.quantity <= 0) {
      await cart.destroy();
      throw new Error("Cart entry deleted due to invalid quantity");
    }
  });

  // Define a beforeCreate hook to prevent creation of cart entry with quantity 0 or negative
  Cart.beforeCreate((cart) => {
    if (cart.quantity <= 0) {
      throw new Error("Cannot create cart entry with invalid quantity");
    }
  });

  return Cart;
};
