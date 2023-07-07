import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from "axios";
import { createOrder } from "../../../redux/actions"
import { useDispatch } from "react-redux";

const stripePromise = loadStripe("pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri");

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    orderEmail: "",
    payerFirstName: "",
    payerLastName: "",
    payerPhone: "",
    payerIdNumber: "",
    payerCountry: "",
    payerRegion: "",
    payerCity: "",
    payerAddress: "123 Street",
    payerPostalCode: "12345",
    orderNotes: "note",
    deliveryOption: "Standard",
  });

  const [error, setError] = useState({});

  const validate = (input) => {
    let errors = {};

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.orderEmail)) {
      errors.orderEmail = "Ingrese un correo electrónico";
    }

    if (!/^[a-zA-Z]+$/.test(input.payerFirstName)) {
      errors.payerFirstName = "Ingrese un nombre válido";
    }

    if (!/^[a-zA-Z]+$/.test(input.payerLastName)) {
      errors.payerLastName = "Ingrese un apellido valido";
    }

    if (!/^\d+$/.test(input.payerPhone)) {
      errors.payerPhone = "Ingrese un número de teléfono";
    }

    if (!/^[A-Z0-9]+$/.test(input.payerIdNumber)) {
      errors.payerIdNumber = "Ingrese un número de identificación";
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(input.payerCountry)) {
      errors.payerCountry = "Ingrese un país";
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(input.payerRegion)) {
      errors.payerRegion = "Ingrese una región";
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/.test(input.payerCity)) {
      errors.payerCity = "Ingrese una ciudad";
    }

    if (!/^[\w\s.-]+$/.test(input.payerAddress)) {
      errors.payerAddress = "Ingrese una dirección";
    }

    if (!/^\d+$/.test(input.payerPostalCode)) {
      errors.payerPostalCode = "Ingrese un código postal";
    }

    return errors;
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showBillingInfo, setShowBillingInfo] = useState(false);
  const { productPrice } = router.query;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
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
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      dispatch(createOrder(input));

      alert("HACEMOS EL DISPATCH");
    } else {
      alert("FALTAN CAMPOS A COMPLETAR");
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (Object.keys(error).length === 0 && Object.values(input).every(value => value !== '')) {
      setShowDeliveryInfo(true);
    } else {
      alert("FALTAN CAMPOS A COMPLETAR");
    }
  };
  
  const handleEdit = () => {
    setShowDeliveryInfo(false);
  };

    const handleContinueToBilling = () => {
      setShowDeliveryInfo(false);
      setShowBillingInfo(true);
    };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {!showDeliveryInfo && !showBillingInfo ? (
            <div>
              <h2>¿Cómo te gustaría recibir tu pedido?</h2>
              <div>
                <button>Iniciar sesión</button>
              </div>
              <h2>Ingresa tu nombre y dirección:</h2>
    <form onSubmit={handleFormSubmit}>
        <div>
          <label>Email: </label>
          <input
            name="orderEmail"
            value={input.orderEmail}
            onChange={handleChange}
          />
        </div>
        <span>{error.orderEmail}</span>
        <div>
          <label>Nombre: </label>
          <input
            name="payerFirstName"
            value={input.payerFirstName}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerFirstName}</span>
        <div>
          <label>Apellido: </label>
          <input
            name="payerLastName"
            value={input.payerLastName}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerLastName}</span>
        <div>
          <label>Teléfono: </label>
          <input
            name="payerPhone"
            value={input.payerPhone}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerPhone}</span>
        <div>
          <label>Número de identificación: </label>
          <input
            name="payerIdNumber"
            value={input.payerIdNumber}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerIdNumber}</span>
        <div>
          <label>País: </label>
          <input
            name="payerCountry"
            value={input.payerCountry}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerCountry}</span>
        <div>
          <label>Región: </label>
          <input
            name="payerRegion"
            value={input.payerRegion}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerRegion}</span>
        <div>
          <label>Ciudad: </label>
          <input
            name="payerCity"
            value={input.payerCity}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerCity}</span>
        <div>
          <label>Dirección: </label>
          <input
            name="payerAddress"
            value={input.payerAddress}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerAddress}</span>
        <div>
          <label>Código Postal: </label>
          <input
            name="payerPostalCode"
            value={input.payerPostalCode}
            onChange={handleChange}
          />
        </div>
        <span>{error.payerPostalCode}</span>
        <div>
          {Object.keys(error).length === 0 && Object.values(input).every(value => value !== '') ? (
            <button type="submit" onClick={handleContinue}>
              Continuar con gastos de envío y gestión
            </button>
          ) : (
            <span>FALTAN CAMPOS A COMPLETAR</span>
          )}
        </div>
      </form>
            </div>
          ) : showDeliveryInfo && !showBillingInfo ? (
            <div>
              <h2>Fecha estimada de entrega</h2>
              <div>
                <p>Llega el mié 12 de jul</p>
                <select
                   name="deliveryOption"
                   value={input.deliveryOption}
                   onChange={handleChange}
                   >
                 <option value="Standard">Standard</option>
                 <option value="Premium">Premium</option>
                 <option value="International">International</option>
               </select>
              </div>
              <button onClick={handleContinueToBilling}>
                Continuar a la facturación
              </button>
              <h2>Datos de entrega</h2>
              <div>
                <button onClick={handleEdit}>Editar</button>
                <p>{input.payerFirstName} {input.payerLastName}</p>
                <p>{input.payerAddress}</p>
                <p>{input.orderEmail}</p>
                <p>{input.payerPhone}</p>
              </div>
            </div>
          ) : (
            <div>
             <h2>Forma de pago</h2>
          <div>
            <p>Obtén 3 y 6 meses sin intereses en compras mayores a $3,000. Sólo para miembros.</p>
            <p>*Promoción con tarjetas de crédito. Consulta bancos participantes.</p>
            <p>Términos y Condiciones</p>
          </div>
          <div>
            <button>Tarjeta de crédito o débito</button>
            <h2>Ingresa tus datos de pago:</h2>
            <div className="form-group">
              <CardElement className="form-control payment-input" />
            </div>
            <button className="btn btn-success payment-button" disabled={!stripe} onClick={handleSubmit}>
              {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only">loading...</span>
                </div>
              ) : (
                "Buy"
              )}
            </button>
          </div>
          <p>Si haces clic en Realizar pedido, aceptas los Términos y condiciones de eShopWorld.</p>
              </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          {/* Resumen del pedido */}
          <div>
            <h2>Resumen del pedido</h2>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>${productPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Entrega/Envío:</span>
                <span>{input.deliveryOption}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total:</span>
                <span>${productPrice}</span>
              </div>
            </div>
          </div>
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
            <Checkout />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default StripeCart;