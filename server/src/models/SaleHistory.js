const { DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize) => {
  
  sequelize.define('saleHistory', {

    saleHistoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    priceAtSale: {
      type: DataTypes.FLOAT,
    },

    discountAtSale: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

  }, { timestamps: false });
};

// NOTE FOR FRONT-END IMPLEMENTATION:
// Retrieve sale history entries for a specific user
// const saleHistoryEntriesForUser = await user.getSaleHistories();

// // Retrieve sale history entries for a specific product
// const saleHistoryEntriesForProduct = await product.getSaleHistories();