const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PriceHistory = sequelize.define(
    "PriceHistory",
    {
      priceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false },
  );

  return PriceHistory;
};
