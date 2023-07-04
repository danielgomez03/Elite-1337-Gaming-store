import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

const stripePromise = loadStripe("pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const {  totalProducts, totalPrice, } = router.query;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    cardholderName: Yup.string().required("Cardholder name is required"),
    region: Yup.string().required("Region is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      cardholderName: "",
      region: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!stripe || !elements) {
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          email: values.email,
          name: values.cardholderName,
          address: {
            region: values.region,
          },
        },
      });

      setLoading(true);

      if (!error) {
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post("http://localhost:3001/stripe/process-payment", {
            id,
            amount: Math.round(parseFloat(totalPrice) * 100),
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

        setLoading(false);
      } else {
        console.log("Payment failed!");
        router.push({
          pathname: "/users/stripe/cancel",
          query: { success: false },
        });
      }
    },
  });

  const regionOptions = [
    { value: "region1", label: "Region 1" },
    { value: "region2", label: "Region 2" },
    { value: "region3", label: "Region 3" },
  ];

  return (
    <div className="container payment-container">
      <div className="row">
      <div className="col-md-6">
          <h4 className="payment-price">Total Products: {totalProducts}</h4> 
          <h4 className="payment-price">Total Price: {totalPrice}</h4>
        </div>
        <div className="col-md-6">
          <form onSubmit={formik.handleSubmit} className="payment-form">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
              <input
                type="email"
                className="form-control payment-input"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && <div className="payment-error">{formik.errors.email}</div>}
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control payment-input"
                placeholder="Cardholder Name"
                name="cardholderName"
                value={formik.values.cardholderName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cardholderName && formik.errors.cardholderName && (
                <div className="payment-error">{formik.errors.cardholderName}</div>
              )}
            </div>
            <div className="form-group">
              <select
                className="form-control payment-input"
                name="region"
                value={formik.values.region}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Region</option>
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.region && formik.errors.region && (
                <div className="payment-error">{formik.errors.region}</div>
              )}
            </div>
            <div className="form-group">
              <CardElement className="form-control payment-input" />
            </div>
            <button className="btn btn-success payment-button" disabled={!stripe}>
              {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">loading...</span>
                </div>
              ) : (
                "Buy"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

function StripeCart() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default StripeCart;