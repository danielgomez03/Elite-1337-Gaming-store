const Product = require('../database');
const products = require('../../products');

const postCreateProduct = async (req, res) => {
        try {
            const { productId, name, description, manufacturer, origin, price,  discount,
                stock, isActive, category, images, comments, ratings, carts, favorite } = req.body;
            const product = new Product({
                productId,
                name,
                description,
                manufacturer,
                origin,
                price,
                discount,
                stock,
                isActive,
                category,
                images,
                comments,
                ratings,
                carts,
                favorite
            });
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

module.exports = postCreateProduct;
