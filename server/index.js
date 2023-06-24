const server = require('./src/app.js');
const { conn } = require('./src/database.js');
const { Product, Image, Category } = require('./src/database');
const products = require('./products');




const {
  PORT
} = process.env;
require('dotenv').config();



conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});