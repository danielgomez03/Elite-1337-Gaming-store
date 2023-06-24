const {Product} = require('../database');
const products = require('../../products');
const cloudinary = require('cloudinary').v2;

const postCreateProduct = async (req, res) => {
        try {
            const { productId, name, description, manufacturer, origin, price,  discount,
                stock, isActive, category, images, comments, ratings, carts, favorite } = req.body;
            const product = await Product.create({
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
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

module.exports = postCreateProduct;
