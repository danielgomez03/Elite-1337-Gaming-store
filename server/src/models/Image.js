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

  // Configure the storage engine
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Optional folder in your Cloudinary account
      format: async (req, file) => 'jpg', // Specify the desired file format
      public_id: (req, file) => 'custom_filename', // Specify the desired public ID
    },
  });

  // Create the multer instance
  const upload = multer({ storage: storage });

  Image.upload = async function (file) {
    try {
      const uploadMiddleware = upload.single('image'); // Multer middleware for single file upload
      const promise = new Promise((resolve, reject) => {
        uploadMiddleware(file, null, async (error) => {
          if (error) {
            reject(new Error('Image upload failed'));
          } else {
            const result = file;
            const image = await Image.create({
              url: result.secure_url,
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