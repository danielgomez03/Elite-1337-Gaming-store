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
      deliveryOptionCost
    } = req.body;

    // Crear un nuevo pedido en la base de datos
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
      deliveryOptionCost
    });

    // Devolver una respuesta de éxito con el ID de la orden creada
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
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


const putEditOrder = async (req, res) => {
  try {
    const {
      orderId,
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
    } = req.body;

    // Find the order by its orderId
    const order = await Order.findByPk(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    // Update the order fields
    order.orderEmail = orderEmail;
    order.payerFirstName = payerFirstName;
    order.payerLastName = payerLastName;
    order.payerPhone = payerPhone;
    order.payerIdNumber = payerIdNumber;
    order.payerCountry = payerCountry;
    order.payerRegion = payerRegion;
    order.payerCity = payerCity;
    order.payerAddress = payerAddress;
    order.payerPostalCode = payerPostalCode;
    order.orderNotes = orderNotes;
    order.deliveryOption = deliveryOption;

    // Set the delivery option cost based on the selected delivery option
    if (deliveryOption === "Standard") {
      order.deliveryOptionCost = 25;
    } else if (deliveryOption === "Premium") {
      order.deliveryOptionCost = 50;
    } else if (deliveryOption === "International") {
      order.deliveryOptionCost = 100;
    } else {
      throw new Error("Invalid or missing delivery option");
    }

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error in putEditOrder:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postCreateOrder,
  getAllOrders,
  getOrdersByProductId,
  getOrdersByUserId,
  putEditOrder,
};
