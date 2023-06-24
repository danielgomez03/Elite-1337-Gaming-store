const { User, Product, Category, Image, Comment, Rating, Cart, Favorite} = require("../database");
const products = require("../../products");

const seedDatabase = async () => {
    try {
      // Crear categorías y productos
      for (const productData of products) {
        const { category, images, comments, ratings, carts, favourite, ...productInfo } = productData;
  
        // Crear categoría del producto
        const categoryData = category.category;
        const mainCategory = await Category.findOrCreate({
          where: { categoryId: categoryData.categoryId },
          defaults: {
            name: categoryData.name,
            isMainCategory: categoryData.isMainCategory,
          },
        });
  
        const subCategory = await Category.findOrCreate({
          where: { categoryId: category.categoryId },
          defaults: {
            name: category.name,
            isMainCategory: category.isMainCategory,
          },
        });
  
        // Crear producto
        const product = await Product.create(productInfo);
        console.log('Product created:', product); 
  
        // Asociar categorías al producto
        await product.addCategory(mainCategory[0]);
        await product.addCategory(subCategory[0]);
  
        // Crear imágenes del producto
        for (const imageData of images) {
          await Image.create(imageData);
        }
  
        // Crear comentarios del producto
        for (const commentData of comments) {
          const user = await User.findOrCreate({
            where: { userId: commentData.user.userId },
            defaults: { ...commentData.user },
          });
  
          await Comment.create({
            ...commentData,
            productId: product.productId,
            userId: user[0].userId,
          });
        }
  
        // Crear valoraciones del producto
        for (const ratingData of ratings) {
          const user = await User.findOrCreate({
            where: { userId: ratingData.user.userId },
            defaults: { ...ratingData.user },
          });
  
          await Rating.create({
            ...ratingData,
            productId: product.productId,
            userId: user[0].userId,
          });
        }
  
        // Crear carritos del producto
        for (const cartData of carts) {
          const user = await User.findOrCreate({
            where: { userId: cartData.user.userId },
            defaults: { ...cartData.user },
          });
  
          await Cart.create({
            ...cartData,
            productId: product.productId,
            userId: user[0].userId,
          });
        }
  
        // Crear favorito del producto
        const user = await User.findOrCreate({
          where: { userId: favourite.user.userId },
          defaults: { ...favourite.user },
        });
  
        await Favorite.create({
          ...favourite,
          productId: product.productId,
          userId: user[0].userId,
        });
      }
  
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };
  
  module.exports = { seedDatabase };
