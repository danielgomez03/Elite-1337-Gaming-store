const { DataTypes } = require('sequelize');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (sequelize) => {
  
  const Image = sequelize.define('image', {

    imageId: { // naming it like this is less confusing when interacting with other id fields
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      // unique: true,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    caption: { // unnecesary?
      type: DataTypes.STRING,
      allowNull: true,
    },

  }, { timestamps: false });
  
  Image.upload = async function (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path); // Upload the image to Cloudinary

      // Create a new image record in the database
      const image = await Image.create({
        url: result.secure_url,
      });

      return image;
    } catch (error) {
      throw new Error('Image upload failed');
    }
  };

  return Image;
};