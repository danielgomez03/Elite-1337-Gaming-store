const { Product } = require("../database");

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

    if (typeof updates.price !== "undefined") {
      if (updates.price < 0) {
        throw new Error("Price must be at least 0");
      }
      product.price = updates.price;
    }

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
