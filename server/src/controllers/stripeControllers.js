const Stripe = require("stripe");
const { STRIPE_SECRECT_KEY } = process.env;
const { Payment, Order, Login, Product } = require("../database");

const stripe = new Stripe(STRIPE_SECRECT_KEY);

const processPayment = async (amount, id, userId) => {
  try {
    console.log("Processing payment for user:", userId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Network",
      payment_method: id,
      confirm: true,
    });

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

    const latestOrder = await Order.findOne({
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    });

    if (!latestOrder) {
      throw new Error("No order was found in the database");
    }

    console.log("Latest order found:", latestOrder.orderId);

    const orderId = latestOrder.orderId;

    const payment = await Payment.create({
      amount,
      method: "Credit or Debit Card",
      transactionData: paymentIntent.id,
      orderId: orderId,
      userId: userId,
      loginId: loginId,
    });

    await Order.update(
      { orderStatus: "Payment confirmed" },
      { where: { orderId: orderId } },
    );

    console.log("Payment processed successfully:", payment.paymentId);

    // Update product stock
    const orderProducts = latestOrder.orderProducts;
    for (const orderProduct of orderProducts) {
      const productId = orderProduct.productId;
      const quantity = orderProduct.quantity;
      const product = await Product.findByPk(productId);
      if (product) {
        product.stock -= quantity;
        await product.save();
      }
    }

    console.log("Product stock updated successfully");

    return payment;
  } catch (error) {
    console.error("Error in processPayment:", error);
    throw new Error("An error occurred while processing the payment");
  }
};

const getAllPayments = async () => {
  try {
    const payments = await Payment.findAll();

    return payments;
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    throw new Error("Ocurrió un error al obtener los pagos");
  }
};

module.exports = {
  processPayment,
  getAllPayments,
};
