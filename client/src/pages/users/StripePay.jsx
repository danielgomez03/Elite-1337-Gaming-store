import { loadStripe } from "@stripe/stripe-js"
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from "axios"
import { useState } from "react";
import { useRouter } from "next/router";

const stripePromise = loadStripe("pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri");

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { productId, productName, productPrice, productDescription, productImage } = router.query;
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
          id,
          amount: Math.round(parseFloat(productPrice) * 100)
        });
        console.log(data);
  
        elements.getElement(CardElement).clear();
        console.log("Payment processed successfully");
        
        router.push({
          pathname: "/users/stripe/success",
          query: { success: true },
        });

      } catch (error) {
        console.log(error);
      }

      setLoading(false)
    } else {
      console.log("Payment failed!");
      router.push({
        pathname: "/users/stripe/cancel",
        query: { success: false },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body" >
    {productImage && <img src={productImage} alt="Product" className="img-fluid" />}
    <h3 className="text-center my-2">{productName}</h3>
    <p className="text-center">{productDescription}</p>
    <h4 className="text-center my-2">Price: {productPrice}</h4>
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
  )
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