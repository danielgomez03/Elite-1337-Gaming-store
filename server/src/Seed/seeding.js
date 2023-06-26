const { Product, Image, User } = require("../database");
const products = require("../data/products");
const users = require("../data/users");

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
        productProductId: product.productId, // Asociar la imagen al producto recién creado
      }));

      await Image.bulkCreate(images);
    }

    
    // Insertar usuarios en la base de datos
    for (let i = 0; i < users.length; i++) {
      const userData = users[i];

      const existingUser = await User.findOne({
        where: { userId: userData.userId },
      });

      if (existingUser) {
        console.log(`El usuario con userId ${userData.userId} ya existe en la base de datos. Saltando la creación.`);
        continue;
      }

      const user = await User.create({
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        country: userData.country,
        region: userData.region,
        city: userData.city,
        address: userData.address,
        postalCode: userData.postalCode,
        birthDate: userData.birthDate,
        phoneNumber: userData.phoneNumber,
        idNumber: userData.idNumber,
        userRole: userData.userRole,
        isActive: userData.isActive,
      });

      if (userData.image) {
        // Crear imagen del usuario en la base de datos
        const image = await Image.create({
          imageId: userData.image.imageId,
          url: userData.image.url,
          caption: userData.image.caption,
          userId: user.userId, // Asociar la imagen al usuario recién creado
        });

        console.log(`Se creó una imagen para el usuario con userId ${user.userId}.`);
      }
    }
    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
};

module.exports = { seedDatabase };
