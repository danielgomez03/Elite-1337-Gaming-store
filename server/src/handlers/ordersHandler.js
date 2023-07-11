const { User, Login, Cart, Order, Product, Payment } = require("../database");
const { Op } = require("sequelize");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Payment });
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
    if (!req.session.passport || !req.session.passport.user) {
      throw new Error("User not authenticated");
    }
    // Retrieve userId from session and its associated loginId
    const userId = req.session.passport.user;
    const user = await User.findOne({
      where: { userId },
      include: { model: Login, attributes: ["loginId"] },
    });

    if (!user || !user.login) {
      throw new Error("User or associated login not found");
    }

    const loginId = user.login.loginId;

    // Check if userId is available
    if (!userId || !loginId) {
      throw new Error("User not authenticated");
    }

    const {
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

    // Retrieve the user's cart information from the database
    const userCart = await User.findAll({
      where: { userId },
      include: [{ model: Cart, include: [{ model: Product }] }],
    });

    if (!userCart || userCart.length === 0) {
      throw new Error("User cart not found");
    }

    // Extract the cart items and construct the orderProducts array
    const orderProducts = userCart.map((cartItem) => {
      const { quantity, product } = cartItem.cart;

      return {
        productId: product.productId,
        quantity,
        price: product.price,
        discount: product.discount,
      };
    });

    // Calculate the orderTotalPrice
    const orderTotalPrice = orderProducts.reduce(
      (total, product) =>
        total +
        (product.price - (product.price * product.discount) / 100) *
          product.quantity,
      0,
    );

    // Set the delivery option cost based on the selected delivery option
    let deliveryOptionCost = 0;
    if (deliveryOption === "Standard") {
      deliveryOptionCost = 25;
    } else if (deliveryOption === "Premium") {
      deliveryOptionCost = 50;
    } else if (deliveryOption === "International") {
      deliveryOptionCost = 100;
    } else {
      throw new Error("Invalid or missing delivery option");
    }

    // Create the order
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

    res.status(200).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error in postCreateOrder:", error);
    res.status(400).json({ message: error.message });
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
