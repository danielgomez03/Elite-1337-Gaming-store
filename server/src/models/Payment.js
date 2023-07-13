const { DataTypes } = require("sequelize");
// const { Product } = require("../database");

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

  return Payment;
};
