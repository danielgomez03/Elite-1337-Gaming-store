const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SaleHistory = sequelize.define(
    "saleHistory",
    {
      saleHistoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      priceAtSale: {
        type: DataTypes.DECIMAL(10, 2),
      },

      discountAtSale: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    },
    { timestamps: true },
  );

  SaleHistory.afterCreate(async (saleHistory, options) => {
    const Order = sequelize.models.order;
    const Product = sequelize.models.product;

    try {
      // Find the corresponding Order for the saleHistory
      const order = await Order.findOne({
        where: { saleHistoryId: saleHistory.saleHistoryId },
      });

      if (order) {
        const product = await Product.findByPk(order.productId);

        if (product) {
          // Set the product values in the saleHistory
          saleHistory.priceAtSale = product.price;
          saleHistory.discountAtSale = product.discount;
          // QUANTITY?!

          // Save the updated saleHistory
          await saleHistory.save({ transaction: options.transaction });
        }
      }
    } catch (error) {
      console.error("Error setting product values in saleHistory:", error);
    }
  });

  return SaleHistory;
};

// NOTE FOR FRONT-END IMPLEMENTATION:
// Retrieve sale history entries for a specific user
// const saleHistoryEntriesForUser = await user.getSaleHistories();

// // Retrieve sale history entries for a specific product
// const saleHistoryEntriesForProduct = await product.getSaleHistories();
