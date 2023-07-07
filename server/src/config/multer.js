const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Configure the multer storage for user profile image
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users", // Specify the folder where you want to store user images
    format: async (req, file) => "jpg", // Specify the desired file format
    access_mode: "public", // Specify the access mode for the uploaded images
  },
});

// Configure the storage engine for product images
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    format: async (req, file) => "jpg",
    access_mode: "public",
  },
});

const userUploads = multer({ storage: userStorage });
const productUploads = multer({ storage: productStorage });

module.exports = { userUploads, productUploads };
