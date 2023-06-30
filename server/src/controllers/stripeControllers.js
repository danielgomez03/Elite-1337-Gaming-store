const Stripe = require("stripe");
const { STRIPE_SECRECT_KEY } = process.env;

const stripe = new Stripe(STRIPE_SECRECT_KEY);

const processPayment = async (amount, currency, paymentMethodId, description, customerId) => {
    try {
      // Crear un pago utilizando la biblioteca de Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: paymentMethodId,
        description,
        customer: customerId,
        confirm: true,
      });
  
      return paymentIntent;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      throw new Error('Ocurrió un error al procesar el pago');
    }
  };
  
  module.exports = {
    processPayment,
  };