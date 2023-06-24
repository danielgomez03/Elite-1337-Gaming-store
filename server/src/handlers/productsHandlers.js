const {Product, Image, Category} = require('../database');
const products = require('../../products');
// const {loadCategoriesDb}  = require('../functions/loadCategoriesDb');




const postCreateProduct = async (req, res) => {
    
        try {
            const { productId, name, description, manufacturer, origin, price,  discount,
                stock, isActive, category, images } = req.body;
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
            });
            // const categoryDb = await Category.findOne({ where: { name: category } });
            // await product.addCategory(categoryDb);
            const imagesDb = await Promise.all(images.map(async (image) => {
                const { url } = image;
                const imageDb = await Image.create({ url });
                return imageDb;
            }));
            await product.addImages(imagesDb);
           
            res.status(200).json({ message: 'Product created successfully', product });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

module.exports = postCreateProduct;
