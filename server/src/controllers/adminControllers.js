const { Product, PriceHistory } = require("../database");

const editProduct = async (productId, updates) => {
  try {
    const product = await Product.findOne({
      where: {
        productId: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const hasPriceChange =
      typeof updates.price !== "undefined" && product.price !== updates.price;

    // Check if the price is changing
    if (hasPriceChange) {
      // Find the current PriceHistory entry
      const currentPriceHistory = await PriceHistory.findOne({
        where: {
          productId: productId,
        },
        order: [["createdAt", "DESC"]],
      });

      // Set the last price (current) in the current PriceHistory entry
      if (currentPriceHistory) {
        currentPriceHistory.price = product.price;
        await currentPriceHistory.save();
      } else {
        // Create a new PriceHistory entry with the initial price
        const initialPriceHistoryEntry = {
          price: product.price,
          createdAt: new Date(),
          productId: productId,
        };
        await PriceHistory.create(initialPriceHistoryEntry);
      }

      // Create a new PriceHistory entry with the new price
      const priceHistoryEntry = {
        price: updates.price,
        createdAt: new Date(),
        productId: productId,
      };
      await PriceHistory.create(priceHistoryEntry);

      // Update the product's price
      product.price = updates.price;
    }

    // Update other properties if they are changing
    if (typeof updates.stock !== "undefined") {
      if (updates.stock < 0) {
        throw new Error("Stock must be at least 0");
      }
      product.stock = updates.stock;
    }

    if (typeof updates.description !== "undefined") {
      product.description = updates.description;
    }

    if (typeof updates.discount !== "undefined") {
      if (updates.discount < 0 || updates.discount > 100) {
        throw new Error("Discount must be between 0 and 100");
      }
      product.discount = updates.discount;
    }

    await product.save();

    return product;
  } catch (error) {
    console.error("Error in editProduct:", error);
    throw new Error("Failed to edit the product");
  }
};

module.exports = {
  editProduct,
};
