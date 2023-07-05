const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define(
    "order",
    {
      orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      orderProducts: {
        type: DataTypes.JSONB,
        allowNull: false,
      },

      orderTotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      orderEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      payerFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      payerIdNumber: {
        // forms of personal identification, like DNI or CUIL
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      payerCountry: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerRegion: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerPostalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      orderNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      deliveryOption: {
        type: DataTypes.ENUM("Standard", "Premium", "International"),
        allowNull: false,
      },

      deliveryOptionCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      orderStatus: {
        type: DataTypes.ENUM(
          "Order placed",
          "Payment confirmed",
          "In delivery",
          "Delivered",
        ),
        allowNull: false,
        defaultValue: "Order placed",
      },
    },
    {
      timestamps: true,
    },
  );

  return Order;
};

// With this updated Order model, you can store an array of objects in the products field,
// where each object represents a product and its quantity. For example:

// const order = await Order.create({
//   amount: 100.0,
//   status: "Completed",
//   method: "Credit or Debit Card",
//   transactionId: "123456789",
//   orderProducts: [
//     { productId: 1, quantity: 2 },
//     { productId: 2, quantity: 3 },
//   ],
// });
//
// Order and Products share the "products" property because of their one-to-one association
