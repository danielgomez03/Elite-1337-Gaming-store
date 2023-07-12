import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";


const stripePromise = loadStripe("pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri");

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { totalPrice, products, quantity, prices, discounts } = router.query;
  
  const [input, setInput] = useState({
    orderEmail: "",
    payerFirstName: "",
    payerLastName: "",
    payerPhone: "",
    payerIdNumber: "",
    payerCountry: "",
    payerRegion: "",
    payerCity: "",
    payerAddress: "",
    payerPostalCode: "",
    orderNotes: "note",
    deliveryOption: "Standard",
    orderProducts: [], // Campo adicional para los productos del pedido
    orderTotalPrice: parseFloat(totalPrice), // Campo adicional para el precio total del pedido
    deliveryOptions: {
      Standard: 25,
      Premium: 50,
      International: 100,
    },
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
      deliveryOptionCost: input.deliveryOptions[e.target.value],
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
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
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

        const orderProducts = products.map((productId, index) => ({ 
          productId: productId,
          quantity: parseInt(quantity[index]),
          price: parseFloat(prices[index]), // Agregar el campo de precio del producto
          discount: parseFloat(discounts[index]),
        }));

        await axios.post("http://localhost:3001/orders/create", {
          orderEmail: input.orderEmail,
          payerFirstName: input.payerFirstName,
          payerLastName: input.payerLastName,
          payerPhone: input.payerPhone,
          payerIdNumber: input.payerIdNumber,
          payerCountry: input.payerCountry,
          payerRegion: input.payerRegion,
          payerCity: input.payerCity,
          payerAddress: input.payerAddress,
          payerPostalCode: input.payerPostalCode,
          orderNotes: input.orderNotes,
          deliveryOption: input.deliveryOption,
          orderProducts: orderProducts,// Agregar el campo de productos del pedido
          orderTotalPrice: parseFloat(totalPrice), // Agregar el campo de precio total del pedido
          deliveryOptionCost: input.deliveryOptionCost, 

        });

        const { data } = await axios.post("http://localhost:3001/stripe/process-payment", {
          id,
          amount: Math.round(parseFloat(totalPrice) * 100),
        });
        console.log(data);

        elements.getElement(CardElement).clear();
        console.log("Payment processed successfully");


        localStorage.removeItem("cart");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showBillingInfo) {
      handlePayment();
    } else {
      if (Object.keys(error).length === 0 && Object.values(input).every(value => value !== '')) {
        setShowDeliveryInfo(true);
      } else {
        alert("FALTAN CAMPOS A COMPLETAR");
      }
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
    <div className="mt-8">
      <div className="flex mt-8">
        <div className="flex-1">
          {!showDeliveryInfo && !showBillingInfo ? (
            <div>
              <h2 className="font-bold">¿Cómo te gustaría recibir tu pedido?</h2>
              <h2>Ingresa tu nombre y dirección:</h2>
              <form onSubmit={handleContinue}>
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
                    <button className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-1 text-white duration-100 hover:bg-blue-600 text-sm"  type="submit" onClick={handleContinue}>
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
              <button className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-1 text-white duration-100 hover:bg-blue-600 text-sm"  onClick={handleContinueToBilling}>
                Continuar a la facturación
              </button >
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
                <button className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-1 text-white duration-100 hover:bg-blue-600 text-sm" disabled={!stripe} onClick={handleSubmit}>
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
        <div className="flex-1">
          {/* Resumen del pedido */}
          <div>
            <h2 className="mb-4">Resumen del pedido</h2>
            <div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega/Envío:</span>
                <span>{input.deliveryOption}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default StripeCheckout;
