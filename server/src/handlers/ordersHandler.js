const { Login, Order, Payment, Product, SaleHistory } = require("../database");
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

const createSaleHistoryForOrder = async (order) => {
  try {
    console.log("Creating sale history for order:", order.orderId);

    for (const orderProduct of order.orderProducts) {
      const product = await Product.findByPk(orderProduct.productId);

      if (product) {
        console.log("Creating sale history for product:", product.productId);

        // Convert discountAtSale to integer
        const discountAtSale = parseInt(product.discount, 10);

        // Create a new SaleHistory entry for each order product
        await SaleHistory.create({
          priceAtSale: product.price,
          discountAtSale: discountAtSale,
          quantity: orderProduct.quantity,
          userId: order.userId,
          productId: orderProduct.productId,
          orderId: order.orderId,
        });
      }
    }

    console.log("Sale history creation completed for order:", order.orderId);
  } catch (error) {
    console.error("Error setting product values in saleHistory:", error);
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
      deliveryOption,
      deliveryOptionCost,
      userId,
      loginId,
    });

    await createSaleHistoryForOrder(order);

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
