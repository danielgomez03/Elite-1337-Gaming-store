const { DataTypes } = require('sequelize');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = (sequelize) => {
  const Image = sequelize.define(
    'image',
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
    { timestamps: false }
);

// Configure the storage engine for user images
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images/users', // Store user images in the 'images/users' folder
    format: async (req, file) => 'jpg', // Specify the desired file format
  },
});

// Configure the storage engine for product images
const productStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images/products', // Store product images in the 'images/products' folder
    format: async (req, file) => 'jpg', // Specify the desired file format
  },
});

// Create the multer instances for user and product image uploads
const uploadUser = multer({ storage: userStorage }).single('image');
const uploadProduct = multer({ storage: productStorage }).array('images', 3);

Image.uploadUser = async function (file) {
  try {
    const promise = new Promise((resolve, reject) => {
      uploadUser(file, null, async (error) => {
        if (error) {
          reject(new Error('Image upload failed'));
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
    throw new Error('Image upload failed');
  }
};

Image.uploadProduct = async function (files) {
  try {
    const promise = new Promise((resolve, reject) => {
      uploadProduct(files, null, async (error) => {
        if (error) {
          reject(new Error('Image upload failed'));
        } else {
          const uploadResults = files.map((file) => ({
            url: file.secure_url,
            caption: file.caption,
          }));

          const images = await Image.bulkCreate(uploadResults);
          resolve(images);
        }
      });
    });

    return promise;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

  return Image;
};

// OLD MODEL, FOR ROLLBACKS

// const { DataTypes } = require('sequelize');
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = (sequelize) => {
  
//   const Image = sequelize.define('image', {

//     imageId: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//       primaryKey: true,
//     },

//     url: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     caption: { // Only necessary for product creation, but not for users
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//   }, { timestamps: false });
  
//   Image.upload = async function (file) {
//     try {
//       const result = await cloudinary.uploader.upload(file.path); // Upload the image to Cloudinary

//       // Create a new image record in the database
//       const image = await Image.create({
//         url: result.secure_url,
//       });

//       return image;
//     } catch (error) {
//       throw new Error('Image upload failed');
//     }
//   };

//   return Image;
// };