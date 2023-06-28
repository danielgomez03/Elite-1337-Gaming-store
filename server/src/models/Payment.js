const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Payment = sequelize.define(
    "Payment",
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

      status: {
        type: DataTypes.ENUM("Pending", "Completed", "Failed"),
        allowNull: false,
      },

      method: {
        type: DataTypes.ENUM("MercadoPago", "PayPal"),
        allowNull: false,
      },

      transactionId: {
        // id received from payment service
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Payment;
};
