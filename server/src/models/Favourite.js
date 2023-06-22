const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Favourite = sequelize.define('Favourite', {
  
    favouriteId: { // naming it like this is less confusing when interacting with other id fields
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },

    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    productId: {
        type: DataTypes.UUID,
        allowNull: false,
    },

}, { timestamps: false });

module.exports = Favourite;