require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false },
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Read all files inside the Models folder, require them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inject the connection (sequelize) to every model
modelDefiners.forEach((model) => {
  model(sequelize);
});

// Capitalize the name of the models, ie: product => Product
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
  Favorite,
  Cart,
  SaleHistory,
  Contact,
  Token,
  Order,
  Payment,
  PriceHistory,
  Newsletter,
} = sequelize.models;

// Establish associations between models

// ---> CATEGORY
// Product one-to-many with Category
Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Product, { foreignKey: "categoryId" });

// Category one-to-many with itself
Category.belongsTo(Category, { as: "parent", foreignKey: "parentId" });
Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });

// ---> IMAGE
// Product many-to-one with Image
Product.hasMany(Image, { foreignKey: "productId" });
Image.belongsTo(Product, { foreignKey: "productId" });

// User has one Image (profile picture)
User.hasOne(Image, { foreignKey: "userId", allowNull: true });
Image.belongsTo(User, { foreignKey: "userId", allowNull: true });

// ---> LOGIN
// User one-to-one with Login
User.hasOne(Login, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Login one-to-one with User
Login.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

// ---> COMMENT
// User many-to-one with Comment
User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

// Product many-to-one with Comment
Product.hasMany(Comment, { foreignKey: "productId" });
Comment.belongsTo(Product, { foreignKey: "productId" });

// ---> RATING
// User many-to-one with Rating
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

// Product many-to-one with Rating
Product.hasMany(Rating, { foreignKey: "productId" });
Rating.belongsTo(Product, { foreignKey: "productId" });

// ---> FAVOURITE
// Product many-to-many with User through Favorite
Product.belongsToMany(User, { through: Favorite, foreignKey: "productId" });
User.belongsToMany(Product, { through: Favorite, foreignKey: "userId" });

// ---> CART
// User one-to-one with Cart
User.hasOne(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId" });

// Product one-to-many with Cart
Product.hasMany(Cart, {
  foreignKey: "productId",
  as: "carts",
  onDelete: "SET NULL",
});
Cart.belongsTo(Product, { foreignKey: "productId" });

// ---> SALEHISTORY
// User many-to-one with SaleHistory
User.hasMany(SaleHistory, { foreignKey: "userId" });
SaleHistory.belongsTo(User, { foreignKey: "userId" });

// Product many-to-one with SaleHistory
Product.hasMany(SaleHistory, { foreignKey: "productId" });
SaleHistory.belongsTo(Product, { foreignKey: "productId" });

// ---> CONTACT
// User many-to-one with Contact
User.hasMany(Contact, { foreignKey: "userId", sourceKey: "userId" });
Contact.belongsTo(User, { foreignKey: "userId", targetKey: "userId" });

// Product many-to-one with Contact
Product.hasMany(Contact, { foreignKey: "productId", sourceKey: "productId" });
Contact.belongsTo(Product, { foreignKey: "productId", targetKey: "productId" });

// ---> TOKEN
// User one-to-one with Token
User.hasOne(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

// Login one-to-one with Token
Login.hasOne(Token, { foreignKey: "loginId" });
Token.belongsTo(Login, { foreignKey: "loginId" });

// ---> ORDER
// User many-to-one with Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// Login many-to-one with Order
Login.hasMany(Order, { foreignKey: "loginId" });
Order.belongsTo(Login, { foreignKey: "loginId" });

// Product many-to-many with Order through a junction table
Product.belongsToMany(Order, {
  through: "OrderProduct",
  foreignKey: "productId",
});
Order.belongsToMany(Product, {
  through: "OrderProduct",
  foreignKey: "orderId",
});

// Order one-to-one with Payment
Order.hasOne(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order, { foreignKey: "orderId" });

// ---> PAYMENT
// User has many-to-one with Payment
User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

// Login has many-to-one with Payment
Login.hasMany(Payment, { foreignKey: "loginId" });
Payment.belongsTo(Login, { foreignKey: "loginId" });

// ---> NEWSLETTER
// User has many-to-one with Newsletter
User.hasMany(Newsletter, {
  foreignKey: {
    name: "userId",
    allowNull: true,
  },
});

Newsletter.belongsTo(User, {
  foreignKey: {
    name: "userId",
    allowNull: true,
  },
});

// // ---> PRICEHISTORY
// // Product one-to-one with PriceHistory
// Product.hasOne(PriceHistory, {
//   foreignKey: {
//     name: "productId",
//     allowNull: false,
//   },
//   onDelete: "CASCADE",
// });

// // PriceHistory one-to-one with Product
// PriceHistory.belongsTo(Product, {
//   foreignKey: {
//     name: "productId",
//     allowNull: false,
//   },
//   onDelete: "CASCADE",
// });

module.exports = {
  ...sequelize.models, // to be able to import models like this: const { Product, User } = require("./database.js");
  conn: sequelize, // to import the connection { conn } = require("./database.js");
};
