const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
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

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },

      orderStatus: {
        type: DataTypes.ENUM(
          "Order placed",
          "Payment confirmed",
          "Ready for pickup / delivery",
        ),
        allowNull: false,
        defaultValue: "Order placed",
      },

      subscribeToNewsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      deliveryOption: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      idNumber: {
        // forms of personal identification, like DNI or CUIL
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
      },

      isOtherPersonPickingUp: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      payerStreet: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      payerStreetNumber: {
        type: DataTypes.STRING,
        allowNull: true,
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

      payerPostalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      orderNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      saveInfoForNextPurchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true },
  );
};

// With this updated Order model, you can store an array of objects in the products field,
// where each object represents a product and its quantity. For example:

// const order = await Order.create({
//   amount: 100.0,
//   status: "Completed",
//   method: "Credit or Debit Card",
//   transactionId: "123456789",
//   products: [
//     { productId: 1, quantity: 2 },
//     { productId: 2, quantity: 3 },
//   ],
// });
//
// Order and Products share the "products" property because of their one-to-one association
