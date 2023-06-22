require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// We read all files inside the Models folder, we require them and we add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// We inject the connection (sequelize) to every model
modelDefiners.forEach((model) => {
  model(sequelize);
});

// We capitalize the name of the models, ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// We destructure the sequelize.models object and assign the corresponding models to individual variables
const {
  User,
  Product,
  Category,
  Image,
  Login,
  Comment,
  Rating,
  Favourite,
  CartItem
} = sequelize.models;

// We establish associations between models

// Product one-to-many with Category
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

// Product many-to-one with Image
Product.hasMany(Image);
Image.belongsTo(Product);

// User one-to-one with Login
User.hasOne(Login, { foreignKey: 'userId'});
Login.belongsTo(User, { foreignKey: 'userId' });

// User many-to-one with Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

// Product many-to-one with Comment
Product.hasMany(Comment, { foreignKey: 'productId' });
Comment.belongsTo(Product, { foreignKey: 'productId' });

// User many-to-one with Rating
User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

// Product many-to-one with Rating
Product.hasMany(Rating, { foreignKey: 'productId' });
Rating.belongsTo(Product, { foreignKey: 'productId' });

// Product many-to-many with User through Favourite
Product.belongsToMany(User, {
  through: Favourite,
  foreignKey: 'productId',
});

// User many-to-many with Product through Favourite
User.belongsToMany(Product, {
  through: Favourite,
  foreignKey: 'userId',
});

// User many-to-one with CartItem
User.hasMany(CartItem, {
  foreignKey: 'userId',
  onDelete: 'CASCADE', // Optional: Delete cart items when a user is deleted
});
CartItem.belongsTo(User, { foreignKey: 'userId' });

// Product many-to-one with CartItem
Product.hasMany(CartItem, {
  foreignKey: 'productId',
  onDelete: 'CASCADE', // Optional: Delete cart items when a product is deleted
});
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  ...sequelize.models, // to be able to import models like this: const { Product, User } = require('./database.js');
  conn: sequelize, // to import the connection { conn } = require('./database.js');
  
  User,
  Product,
  Category,
  Image,
  Login,
  Comment,
  Rating,
  Favourite,
  CartItem,
};