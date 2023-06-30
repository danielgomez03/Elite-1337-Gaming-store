import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPaymentIntent } from '../../redux/actions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const StripePay = () => {
  const dispatch = useDispatch();
  const stripePublicKey = 'pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri'; // Reemplaza con tu clave pública de Stripe
  const stripePromise = loadStripe(stripePublicKey);
  const [loading, setLoading] = useState(false);

  const handlePayment = async (event, stripe) => {
    event.preventDefault();

    if (stripe) {
      const elements = stripe.elements();
      const cardElement = elements.getElement(CardElement);

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      setLoading(true);

      if (error) {
        console.log('Error al crear el método de pago:', error);
      } else {
        const paymentData = {
          amount: 100, // Reemplaza con la cantidad deseada
          paymentIntentId: paymentMethod.id,
        };

        await dispatch(createPaymentIntent(paymentData));
      }

      setLoading(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CardForm handlePayment={handlePayment} loading={loading} />
    </Elements>
  );
};

const CardForm = ({ handlePayment, loading }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    await handlePayment(event, stripe);
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img
        src="https://w7.pngwing.com/pngs/469/858/png-transparent-socket-am4-ryzen-central-processing-unit-multi-core-processor-thermal-design-power-cpu-electronics-computer-orange.png"
        alt="ryzen 3"
        className="img-fluid"
      />
      <h3 className="text-center my-2">Price: 100$</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success" disabled={!stripe}>
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">loading...</span>
          </div>
        ) : (
          'Buy'
        )}
      </button>
    </form>
  );
};

export default StripePay;