const { DataTypes } = require("sequelize");
// const { PriceHistory } = require("../database");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      productId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      manufacturer: {
        type: DataTypes.STRING,
      },
      origin: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(3, 1),
        defaultValue: 0,
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: true },
  );

  // // Hook for PriceHistory on price modifications
  // Product.addHook("afterUpdate", async (product, options) => {
  //   if (product.changed("price")) {
  //     const modifiedPrice = product.price;

  //     if (!product.previous("price")) {
  //       const initialPrice = 0;

  //       await PriceHistory.create({
  //         price: initialPrice,
  //         productId: product.productId,
  //       });
  //     }

  //     await PriceHistory.create({
  //       price: modifiedPrice,
  //       productId: product.productId,
  //     });
  //   }
  // });

  return Product;
};

// NOTE FOR FRONT-END IMPLEMENTATION OF STOCK DECREASE WHEN A PRODUCT IS SOLD
// to implement through React Redux

// Hook to automatically update stock when a product is sold
// Product.afterUpdate(async (product, options) => {
//     if (product.stock < product.previous("stock")) {
//       const soldQuantity = product.previous("stock") - product.stock;
//       // Adjust stock count here (e.g., update inventory)
//       // You can perform any necessary logic or database updates based on the soldQuantity
//     }
//   });
