const server = require('./src/app.js');
const { conn } = require('./src/database.js');
const { seedDatabase } = require("./src/controllers/seeding.js");
// const { Product, Image, Category } = require('./src/database');
// const products = require('./products');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  seedDatabase();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
// async function loadProducts() {
//   try {
//     await Product.findOrCreate({
//       name: 'Product 15',
//       description: 'This is product 15',
//       price: 199.99,
//       stock: 10,
//       images:  [
//         {
//         imageId: 1,
//         url: 'https://example.com/image1.jpg',
//         caption: 'Image 1'
//         },
//         {
//         imageId: 2,
//         url: 'https://example.com/image2.jpg',
//         caption: 'Image 2'
//         }
//     ],
//       categories: {
//         categoryId: 1,
//         name: 'Hardware',
//         isMainCategory: true,
//         category: {
//         categoryId: 2,
//         name: 'Monitores',
//         isMainCategory: true,
//         },
//     }
//     // include: [Image, Category],
    
//     });
  


//     condition = true;
  
//   } catch (error) {
//     console.log(error);
//   }
// }
// loadProducts();
// let condition = true;
// if (condition) {
//   loadProducts();
// }