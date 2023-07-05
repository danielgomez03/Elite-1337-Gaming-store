const { DataTypes } = require("sequelize");
const Product = require("../database");

module.exports = (sequelize) => {
  const Payment = sequelize.define(
    "payment",
    {
      paymentId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      amount: {
        // of money, price
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      method: {
        type: DataTypes.ENUM(
          "Credit or Debit Card",
          "Digital Wallet",
          "Bank Transfer",
          "Other",
        ),
        allowNull: false,
      },

      transactionData: {
        // id received from payment service
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true },
  );

  Payment.afterCreate(async (payment) => {
    const order = await payment.getOrder();
    if (order) {
      const products = order.products;
      for (const productId in products) {
        const quantity = products[productId].quantity;
        // Reduce the stock of the product by the quantity sold
        const product = await Product.findByPk(productId);
        if (product) {
          product.stock -= quantity;
          await product.save();
        }
      }
    }
  });

  return Payment;
};
