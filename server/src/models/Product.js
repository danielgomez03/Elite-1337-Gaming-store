const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('Product', {
  
    productId: { // naming it like this is less confusing when interacting with other id fields
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
    },

    manufacturer: {
        type: DataTypes.STRING
    },
    
    origin: { // Country or region of origin of the product, ie: "China". 
        type: DataTypes.STRING,
    },

    price: {
        type: DataTypes.FLOAT,
    },

    discount: { // Discount percentage to apply to the product
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },

    stock: { 
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    isActive: { // the product can be deactivated by an admin by setting this to false
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

}, { timestamps: false });

module.exports = Product;

// NOTE FOR FRONT-END IMPLEMENTATION OF STOCK DECREASE WHEN A PRODUCT IS SOLD
// to implement through React Redux

// Hook to automatically update stock when a product is sold
// Product.afterUpdate(async (product, options) => {
//     if (product.stock < product.previous('stock')) {
//       const soldQuantity = product.previous('stock') - product.stock;
//       // Adjust stock count here (e.g., update inventory)
//       // You can perform any necessary logic or database updates based on the soldQuantity
//     }
//   });