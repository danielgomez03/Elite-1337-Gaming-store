const Stripe = require("stripe");
const { STRIPE_SECRECT_KEY } = process.env;
const { Payment, Order, User, Login } = require("../database");

const stripe = new Stripe(STRIPE_SECRECT_KEY);

const processPayment = async (amount, id, userId) => {
  try {
    // Crear un pago utilizando la biblioteca de Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Network",
      payment_method: id,
      confirm: true,
    });

    console.log("USER ID: ", userId);
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

    // Obtener el orderId del último pedido realizado
    const latestOrder = await Order.findOne({
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
    });

    if (!latestOrder) {
      throw new Error("No se encontró ningún pedido en la base de datos");
    }

    const orderId = latestOrder.orderId;

    // Crear un registro de pago en la base de datos
    const payment = await Payment.create({
      amount,
      method: "Credit or Debit Card", // Método de pago específico (puedes personalizarlo según tus necesidades)
      transactionData: paymentIntent.id, // ID del pago recibido del servicio de Stripe
      orderId: orderId,
      userId: userId,
      loginId: loginId,
    });
    // Actualizar el estado del pedido a "Pagado" en la base de datos
    await Order.update({ status: "Paid" }, { where: { id: orderId } });

    return payment;
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    throw new Error("Ocurrió un error al procesar el pago");
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
