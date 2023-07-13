const {
  processPayment,
  getAllPayments,
} = require("../controllers/stripeControllers");

const processPaymentHandler = async (req, res) => {
  const { amount, id, userId } = req.body;

  try {
    const paymentIntent = await processPayment(amount, id, userId);

    // Si el pago es exitoso, devuelve una respuesta al cliente
    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error en processPaymentHandler:", error);
    res.status(500).json({ error: "Ocurrió un error al procesar el pago" });
  }
};

const getAllPaymentsHandler = async (req, res) => {
  try {
    const payments = await getAllPayments();

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Error en getAllPaymentsHandler:", error);
    res.status(500).json({ error: "Ocurrió un error al obtener los pagos" });
  }
};

module.exports = {
  processPaymentHandler,
  getAllPaymentsHandler,
};
