const { DataTypes } = require("sequelize");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (sequelize) => {
  const Image = sequelize.define(
    "image",
    {
      imageId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false },
  );

  // Configure the storage engine for user images
  const userStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "/users",
      format: async (req, file) => "jpg",
      access_mode: "public",
    },
  });

  // Configure the storage engine for product images
  const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "/products",
      format: async (req, file) => "jpg",
      access_mode: "public",
    },
  });

  // Create the multer instances for user and product image uploads
  const uploadUser = multer({ storage: userStorage }).single("image");
  const uploadProduct = multer({ storage: productStorage }).array("images", 3);

  Image.uploadUser = async function (file) {
    try {
      const promise = new Promise((resolve, reject) => {
        uploadUser(file, null, async (error) => {
          if (error) {
            reject(new Error("Image upload failed"));
          } else {
            const image = await Image.create({
              url: file.secure_url,
            });
            resolve(image);
          }
        });
      });

      return promise;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  Image.uploadProduct = async function (images) {
    try {
      const uploadedImages = [];

      for (const image of images) {
        if (typeof image === "object" && image.url) {
          // Image is provided as a text URL
          const uploadedImage = await Image.create({
            url: image.url,
            caption: image.caption,
          });

          uploadedImages.push(uploadedImage);
        } else {
          // Image is uploaded as a file
          const uploadResult = await Image.uploadUser(image);
          uploadedImages.push(uploadResult);
        }
      }

      return uploadedImages;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  return Image;
};
