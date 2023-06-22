const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Image = sequelize.define('Image', {

  imageId: { // naming it like this is less confusing when interacting with other id fields
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },

  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  caption: {
    type: DataTypes.STRING,
  },

}, { timestamps: false });

module.exports = Image;