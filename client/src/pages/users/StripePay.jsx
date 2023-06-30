import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../redux/actions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePay = () => {
  const dispatch = useDispatch();
  const [stripe, setStripe] = useState(null);
  const [amount, setAmount] = useState(0);
  const stripePublicKey = 'pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri'; // Reemplaza con tu clave pública de Stripe

  useEffect(() => {
    const initializeStripe = async () => {
      const stripePromise = loadStripe(stripePublicKey);
      setStripe(stripePromise);
    };

    initializeStripe();
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;
    const elements = stripe.elements();
    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('Error al crear el método de pago:', error);
    } else {
      const paymentData = {
        amount: amount,
        paymentIntentId: paymentIntent.id,
      };

      await dispatch(createPaymentIntent(paymentData));
    }
  };

  return (
    <div>
      <form onSubmit={handlePayment}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

        {stripe && (
          <Elements stripe={stripe}>
            <div>
              <label>
                Card details
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
              </label>
            </div>
            <button type="submit">Pay with Stripe</button>
          </Elements>
        )}
      </form>
    </div>
  );
};

export default StripePay;


