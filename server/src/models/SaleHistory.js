const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SaleHistory = sequelize.define(
    "saleHistory",
    {
      saleHistoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      priceAtSale: {
        type: DataTypes.DECIMAL(10, 2),
      },

      discountAtSale: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    },
    { timestamps: true },
  );

  return SaleHistory;
};
