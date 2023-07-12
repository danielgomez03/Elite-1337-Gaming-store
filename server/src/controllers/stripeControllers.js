const Stripe = require("stripe");
const { STRIPE_SECRECT_KEY } = process.env;
const { Payment} = require("../database")

const stripe = new Stripe(STRIPE_SECRECT_KEY);

const processPayment = async (amount, id) => {
    try {
      // Crear un pago utilizando la biblioteca de Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Network",
        payment_method: id,
        confirm: true,
      });
      
       // Crear un registro de pago en la base de datos
      const payment = await Payment.create({
      amount,
      method: "Credit or Debit Card", // Método de pago específico (puedes personalizarlo según tus necesidades)
      transactionData: paymentIntent.id, // ID del pago recibido del servicio de Stripe
    });

    return payment;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      throw new Error('Ocurrió un error al procesar el pago');
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
    getAllPayments
  };