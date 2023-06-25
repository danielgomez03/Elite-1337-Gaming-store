const { Product, Image } = require("../database");
const products = require("../data/products");

const seedDatabase = async () => {
  try {
    // Insertar productos en la base de datos
    for (let i = 0; i < products.length; i++) {
      const productData = products[i];

      // Verificar si el producto ya existe en la base de datos
      const existingProduct = await Product.findOne({
        where: { productId: productData.productId },
      });

      if (existingProduct) {
        console.log(`El producto con productId ${productData.productId} ya existe en la base de datos. Saltando la creación.`);
        continue;
      }

      // Crear el producto en la base de datos
      const product = await Product.create({
        productId: productData.productId,
        name: productData.name,
        description: productData.description,
        manufacturer: productData.manufacturer,
        origin: productData.origin,
        price: productData.price,
        discount: productData.discount,
        stock: productData.stock,
        isActive: productData.isActive,
      });

      // Insertar imágenes del producto en la base de datos
      const images = productData.images.map(imageData => ({
        imageId: imageData.imageId,
        url: imageData.url,
        caption: imageData.caption,
        productId: product.productId
      }));

      await Image.bulkCreate(images);
      
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
};

module.exports = { seedDatabase };
