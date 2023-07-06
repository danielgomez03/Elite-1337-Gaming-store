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
      // format: async (req, file) => "jpg",
      access_mode: "public",
    },
  });

  // Configure the storage engine for product images
  const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "/products",
      // format: async (req, file) => "jpg",
      access_mode: "public",
    },
  });

  // Create the multer instances for user and product image uploads
  const uploadUser = multer({ storage: userStorage }).single("image");
  const uploadProduct = multer({ storage: productStorage }).array("images", 3);

  Image.uploadUser = async function (req, res) {
    try {
      return new Promise((resolve, reject) => {
        uploadUser(req, res, async (error) => {
          if (error) {
            reject(new Error("Image upload failed"));
          } else {
            try {
              const image = await Image.create({
                url: req.file.secure_url,
              });
              resolve(image);
            } catch (error) {
              reject(new Error("Image creation failed"));
            }
          }
        });
      });
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  Image.uploadProduct = async function (req, res) {
    try {
      return new Promise((resolve, reject) => {
        uploadProduct(req, res, async (error) => {
          if (error) {
            reject(new Error("Image upload failed"));
          } else {
            try {
              const uploadedImages = [];

              for (const file of req.files) {
                const uploadedImage = await Image.create({
                  url: file.secure_url,
                  caption: file.caption,
                });
                uploadedImages.push(uploadedImage);
              }

              resolve(uploadedImages);
            } catch (error) {
              reject(new Error("Image creation failed"));
            }
          }
        });
      });
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  return Image;
};
