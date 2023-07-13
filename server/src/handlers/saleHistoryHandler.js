const { SaleHistory, User, Product } = require("../database");

const getAllSaleHistoryHandler = async (req, res) => {
  try {
    const saleHistory = await SaleHistory.findAll({
      include: [User, Product],
    });

    res.status(200).json({ success: true, saleHistory });
  } catch (error) {
    console.error("Error in getAllSaleHistoryHandler:", error);
    res.status(500).json({ error: "Failed to retrieve sale history" });
  }
};

const getSaleHistoryByUserIdHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const saleHistory = await SaleHistory.findAll({
      where: { userId },
      include: [User, Product],
    });

    res.status(200).json({ success: true, saleHistory });
  } catch (error) {
    console.error("Error in getSaleHistoryByUserIdHandler:", error);
    res.status(500).json({ error: "Failed to retrieve sale history" });
  }
};

const getSaleHistoryByProductIdHandler = async (req, res) => {
  const { productId } = req.params;

  try {
    const saleHistory = await SaleHistory.findAll({
      where: { productId },
      include: [User, Product],
    });

    res.status(200).json({ success: true, saleHistory });
  } catch (error) {
    console.error("Error in getSaleHistoryByProductIdHandler:", error);
    res.status(500).json({ error: "Failed to retrieve sale history" });
  }
};

module.exports = {
  getAllSaleHistoryHandler,
  getSaleHistoryByUserIdHandler,
  getSaleHistoryByProductIdHandler,
};
