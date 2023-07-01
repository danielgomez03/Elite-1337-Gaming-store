import { loadStripe } from "@stripe/stripe-js"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from "axios"
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri");

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();

   const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    setLoading(true);

    if(!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:3001/stripe/process-payment", {
          payment_method: id,
          amount: 10000,
          currency: "USD",
          description: "Descripción del pago", // Descripción del pago
          customer: "customerId"
        });
        console.log(data);
  
        elements.getElement(CardElement).clear();

      } catch (error) {
        console.log(error);
      }

      setLoading(false)

    };

  };

  return <form onSubmit={handleSubmit} className="card card-body" >
    
    <img src="https://w7.pngwing.com/pngs/469/858/png-transparent-socket-am4-ryzen-central-processing-unit-multi-core-processor-thermal-design-power-cpu-electronics-computer-orange.png" alt="ryzen 3" className="img-fluid" />
    <h3 className="text-center my-2">Price: 100$</h3>
    <div className="form-group">
     <CardElement className="form-control" />
    </div>
    <button className="btn btn-success" disabled={!stripe} >
      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">loading...</span>
        </div>
      ) : "Buy"}
    </button>
  </form>
}

function StripePay() {
  return (
    <Elements stripe={stripePromise} >
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default StripePay;