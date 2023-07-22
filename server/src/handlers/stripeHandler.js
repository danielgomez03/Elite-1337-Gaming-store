const {
  processPayment,
  getAllPayments,
} = require("../controllers/stripeControllers");

const processPaymentHandler = async (req, res) => {
  const { amount, id, userId } = req.body;

  try {
    const paymentIntent = await processPayment(amount, id, userId);

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error("Error in processPaymentHandler:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the payment" });
  }
};

const getAllPaymentsHandler = async (req, res) => {
  try {
    const payments = await getAllPayments();

    res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Error in getAllPaymentsHandler:", error);
    res
      .status(500)
      .json({ error: "An error occurred while obtaining the payments" });
  }
};

module.exports = {
  processPaymentHandler,
  getAllPaymentsHandler,
};
