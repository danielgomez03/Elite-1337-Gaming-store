const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PriceHistory = sequelize.define(
    "priceHistory",
    {
      priceHistoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
      },

      // discount: {
      //   type: DataTypes.INTEGER,
      // },

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
