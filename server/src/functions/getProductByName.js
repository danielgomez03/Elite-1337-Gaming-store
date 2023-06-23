const { Product, Category, Image } = require('../database.js');

async function getProductByName(req, res) {
    res.send("getProductByName")
}

module.exports = getProductByName;
