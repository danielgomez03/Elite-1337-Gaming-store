const { conn, Product, Image, Category } = require('../database');
const products = require('../../products');


const postCreateProduct = async (req, res) => {
    
        try {

            const { productId, name, description, manufacturer, origin, price, discount,
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
            const categoryDb = [category];
            for (const category of categoryDb) {
                const categoryDb2 = await Category.findOne({ where: { name: category.name } });
                if (!categoryDb2) {
                    return res.status(400).json({ message: 'Category does not exist' });
                }
                if (category.subcategories && category.subcategories.length > 0) {
                    const categoryDb3 = await Category.findOne({ where: { name: category.subcategories.name } });
                    if (!categoryDb3) {
                        return res.status(400).json({ message: 'Category does not exist' });
                    }
                }

                
                
            }
            
            
            
            

            const imagesDb = await Promise.all(images.map(async (image) => {
                const { url, publicId } = image;
                const imageDb = await Image.create({ url, publicId });
                return imageDb;
            }));
            
            await product.addImages(imagesDb);
           
            res.status(200).json({ message: 'Product created successfully', product });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

module.exports = postCreateProduct;