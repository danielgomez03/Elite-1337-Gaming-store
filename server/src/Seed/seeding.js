const { Product, Image, User, Category, Login } = require('../database');
const products = require('../data/products');
const users = require('../data/users');
const categories = require('../data/categories');

const createCategories = async (categories, parentId = null) => {
  const createdCategories = [];

  for (const categoryData of categories) {
    const { name, subcategories } = categoryData;

    // Check if category with the same name already exists
    const existingCategory = await Category.findOne({
      where: { name, parentId },
    });

    if (existingCategory) {
      // Category already exists, update its parentId if necessary
      existingCategory.parentId = parentId;
      await existingCategory.save();
      createdCategories.push(existingCategory); // Add the updated category to the array
    } else {
      // Category doesn't exist, create a new one
      const category = await Category.create({
        name,
        parentId,
        isMainCategory: !parentId,
      });
      createdCategories.push(category); // Add the newly created category to the array

      if (subcategories && subcategories.length > 0) {
        const createdSubcategories = await createCategories(
          subcategories,
          category.categoryId
        );
        createdCategories.push(...createdSubcategories); // Add the created subcategories to the array
      }
    }
  }

  return createdCategories;
};

const seedDatabase = async () => {
  try {
    // Insert categories into the database
    const allCategories = await createCategories(categories);

    // Insert users into the database
    for (let i = 0; i < users.length; i++) {
      const userData = users[i];
      const existingUser = await User.findOne({
        where: { userId: userData.userId },
        include: Login, // Include the Login model in the query
      });

      if (existingUser) {
        console.log(
          `The user with userId ${userData.userId} already exists in the database. Skipping creation.`
        );
        continue;
      }

      const createdUser = await User.create(userData);
      
      if (userData.login) {
        // Create login for the user
        const loginData = userData.login;
        const createdLogin = await Login.create(loginData);
        await createdUser.setLogin(createdLogin); // Associate the login with the newly created user
      }

      if (userData.image) {
        // Create user image in the database
        const image = await Image.create(userData.image);
        await createdUser.setImage(image); // Associate the image with the newly created user
      }
    }

    // Insert products into the database
    for (let i = 0; i < products.length; i++) {
      const productData = products[i];
      const existingProduct = await Product.findOne({
        where: { productId: productData.productId },
      });

      if (existingProduct) {
        console.log(
          `The product with productId ${productData.productId} already exists in the database. Skipping creation.`
        );
        continue;
      }

      // Get the product category
      const category = allCategories.find(
        (cat) => cat.categoryId === productData.categoryId
      );

      if (!category) {
        console.log(
          `Category with categoryId ${productData.categoryId} was not found for product with productId ${productData.productId}. Skipping product creation.`
        );
        continue;
      }

      // Create the product in the database
      const product = await Product.create(productData);
      await product.setCategory(category); // Associate the product with the category

      // Insert product images into the database
      const images = productData.images.map((imageData) => ({
        ...imageData,
        productId: product.productId, // Associate the image with the product
      }));

      await Image.bulkCreate(images);
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
};

module.exports = { seedDatabase };










































// const { Product, Image, User } = require('../database');
// const products = require('../data/products');
// const users = require('../data/users');

// const seedDatabase = async () => {
//   try {
//     // Insertar productos en la base de datos
//     for (let i = 0; i < products.length; i++) {
//       const productData = products[i];

//       // Verificar si el producto ya existe en la base de datos
//       const existingProduct = await Product.findOne({
//         where: { productId: productData.productId },
//       });

//       if (existingProduct) {
//         console.log(`El producto con productId ${productData.productId} ya existe en la base de datos. Saltando la creación.`);
//         continue;
//       }

//       // Crear el producto en la base de datos
//       const product = await Product.create({
//         productId: productData.productId,
//         name: productData.name,
//         description: productData.description,
//         manufacturer: productData.manufacturer,
//         origin: productData.origin,
//         price: productData.price,
//         discount: productData.discount,
//         stock: productData.stock,
//         isActive: productData.isActive,
//       });

//       // Insertar imágenes del producto en la base de datos
//       const images = productData.images.map(imageData => ({
//         imageId: imageData.imageId,
//         url: imageData.url,
//         caption: imageData.caption,
//       }));

//       await Image.bulkCreate(images);
//     }

    
//     // Insertar usuarios en la base de datos
//     for (let i = 0; i < users.length; i++) {
//       const userData = users[i];

//       const existingUser = await User.findOne({
//         where: { userId: userData.userId },
//       });

//       if (existingUser) {
//         console.log(`El usuario con userId ${userData.userId} ya existe en la base de datos. Saltando la creación.`);
//         continue;
//       }

//       const user = await User.create({
//         userId: userData.userId,
//         firstName: userData.firstName,
//         lastName: userData.lastName,
//         country: userData.country,
//         region: userData.region,
//         city: userData.city,
//         address: userData.address,
//         postalCode: userData.postalCode,
//         birthDate: userData.birthDate,
//         phoneNumber: userData.phoneNumber,
//         idNumber: userData.idNumber,
//         userRole: userData.userRole,
//         isActive: userData.isActive,
//       });

//       if (userData.image) {
//         // Crear imagen del usuario en la base de datos
//         const image = await Image.create({
//           imageId: userData.image.imageId,
//           url: userData.image.url,
//           caption: userData.image.caption,
//           userId: user.userId, // Asociar la imagen al usuario recién creado
//         });

//         // console.log(`Se creó una imagen para el usuario con userId ${user.userId}.`);
//       }
//     }
//     console.log('Seeding completed successfully.');
//   } catch (error) {
//     console.error('Seeding failed:', error);
//   }
// };

// module.exports = { seedDatabase };