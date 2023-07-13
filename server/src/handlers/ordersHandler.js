const { User, Login, Cart, Order, Product, Payment } = require("../database");
const { Op } = require("sequelize");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Payment,
        attributes: ["paymentId"],
      },
    });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    res.status(400).json({ message: error.message });
  }
};

const getOrdersByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const orders = await Order.findAll({
      where: {
        orderProducts: {
          [Op.contains]: [{ productId }],
        },
      },
      include: Payment,
    });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getOrdersByProductId:", error);
    res.status(400).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: Payment,
    });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getOrdersByUserId:", error);
    res.status(400).json({ message: error.message });
  }
};

const postCreateOrder = async (req, res) => {
  try {
    const {
      orderProducts,
      orderTotalPrice,
      orderEmail,
      payerFirstName,
      payerLastName,
      payerPhone,
      payerIdNumber,
      payerCountry,
      payerRegion,
      payerCity,
      payerAddress,
      payerPostalCode,
      orderNotes,
      deliveryOption,
      deliveryOptionCost,
      userId,
    } = req.body;

    const login = await Login.findOne({
      where: { userId: userId },
    });

    if (!login) {
      return res.status(404).json({
        success: false,
        message: "Login not found",
      });
    }

    const loginId = login.loginId;

    const order = await Order.create({
      orderProducts,
      orderTotalPrice,
      orderEmail,
      payerFirstName,
      payerLastName,
      payerPhone,
      payerIdNumber,
      payerCountry,
      payerRegion,
      payerCity,
      payerAddress,
      payerPostalCode,
      orderNotes,
      deliveryOption,
      deliveryOptionCost,
      userId,
      loginId,
    });

    // Devolver una respuesta de éxito con el ID de la orden creada
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

module.exports = {
  postCreateOrder,
  getAllOrders,
  getOrdersByProductId,
  getOrdersByUserId,
};
