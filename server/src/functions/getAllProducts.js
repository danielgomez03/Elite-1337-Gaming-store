const { Product, Image } = require('../database');
const { getAllCategories } = require('../handlers/categoriesHandlers');

async function getAllProducts(req, res) {
    // getAllCategories();
    res.status(200).json({ message: 'getAllProducts' });
    // try {
    //     const products = await Product.findAll({
    //     include: Image,
    //     });
    //     res.status(200).json(products);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'There was a problem trying to get the products' });
    // }
}

module.exports = getAllProducts;