import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NLpy7I38Ri7taZJ4rFoHHQbU6O1RGWVIsZTDSWgZegydWiZxtDuP5jPA6deFh70cKwtAb2l8MB3SwsS6EBO12To00c4iLaQri",
);

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { productPrice, productId, quantity, price, discount } = router.query;
  const userId = useSelector((state) => state.userId);

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
    orderTotalPrice: parseFloat(productPrice), // Campo adicional para el precio total del pedido
    deliveryOptions: {
      Standard: 25,
      Premium: 50,
      International: 100,
    },
  });

  const [error, setError] = useState({});

  const validate = (input) => {
    let errors = {};

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.orderEmail)
    ) {
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
      }),
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
          orderProducts: [
            `productId: ${productId}`,
            `quantity: ${quantity}`,
            `price: ${price}`,
            `discount: ${discount}`,
          ], // Agregar el campo de productos del pedido
          orderTotalPrice: parseFloat(productPrice), // Agregar el campo de precio total del pedido
          deliveryOptionCost: input.deliveryOptions[input.deliveryOption],
          userId,
        });

        const { data } = await axios.post(
          "http://localhost:3001/stripe/process-payment",
          {
            id,
            amount: Math.round(
              parseFloat(productPrice) +
                input.deliveryOptions[input.deliveryOption],
            ),
            userId,
          },
        );
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
      setShowDeliveryInfo(true);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (
      Object.keys(error).length === 0 &&
      Object.values(input).every((value) => value !== "")
    ) {
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
        <div>
          {!showDeliveryInfo && !showBillingInfo ? (
            <div>
              <h2>Porfavor Llena los datos de facturacion:</h2>
              <form
  className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
  onSubmit={handleContinue}
>
  <div className="flex flex-wrap -mx-2">
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="email"
        id="email"
        name="orderEmail"
        placeholder="john@example.com"
        value={input.orderEmail}
        onChange={handleChange}
      />
      <span>{error.orderEmail}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="name"
        name="payerFirstName"
        placeholder="John Doe"
        value={input.payerFirstName}
        onChange={handleChange}
      />
      <span>{error.payerFirstName}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last-name">Apellido</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="last-name"
        name="payerLastName"
        placeholder="Doe"
        value={input.payerLastName}
        onChange={handleChange}
      />
      <span>{error.payerLastName}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Teléfono</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="phone"
        name="payerPhone"
        placeholder="123-456-7890"
        value={input.payerPhone}
        onChange={handleChange}
      />
      <span>{error.payerPhone}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id-number">identificación</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="id-number"
        name="payerIdNumber"
        placeholder="123456789"
        value={input.payerIdNumber}
        onChange={handleChange}
      />
      <span>{error.payerIdNumber}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">País</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="country"
        name="payerCountry"
        placeholder="País"
        value={input.payerCountry}
        onChange={handleChange}
      />
      <span>{error.payerCountry}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">Región</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="region"
        name="payerRegion"
        placeholder="Región"
        value={input.payerRegion}
        onChange={handleChange}
      />
      <span>{error.payerRegion}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Ciudad</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="city"
        name="payerCity"
        placeholder="Ciudad"
        value={input.payerCity}
        onChange={handleChange}
      />
      <span>{error.payerCity}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Dirección</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="address"
        name="payerAddress"
        placeholder="Dirección"
        value={input.payerAddress}
        onChange={handleChange}
      />
      <span>{error.payerAddress}</span>
    </div>
    <div className="mb-4 w-1/2 px-2">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postal-code">Código Postal</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        type="text"
        id="postal-code"
        name="payerPostalCode"
        placeholder="Código Postal"
        value={input.payerPostalCode}
        onChange={handleChange}
      />
      <span>{error.payerPostalCode}</span>
    </div>
  </div>
  <button
    className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
    type="submit"
  >
    Continuar con gastos de envío y gestión
  </button>
</form>
            </div>
          ) : showDeliveryInfo && !showBillingInfo ? (
 <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
  <h2 className="text-xl font-bold mb-4">Fecha estimada de entrega</h2>
  <div className="mb-4">
    <p>Llega el mié 12 de jul</p>
    <select
      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
      name="deliveryOption"
      value={input.deliveryOption}
      onChange={handleChange}
    >
      <option value="Standard">Standard</option>
      <option value="Premium">Premium</option>
      <option value="International">International</option>
    </select>
  </div>
  <button
    className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-2 text-white duration-100 hover:bg-blue-600 text-sm"
    onClick={handleContinueToBilling}
  >
    Continuar a la facturación
  </button>
  <h2 className="mt-6 text-xl font-bold mb-4">Datos de entrega</h2>
  <div>
    <button
      className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-2 text-white duration-100 hover:bg-blue-600 text-sm"
      onClick={handleEdit}
    >
      Editar
    </button>
    <p className="mt-4 text-lg font-semibold">{input.payerFirstName} {input.payerLastName}</p>
<p className="text-gray-600">{input.payerAddress}</p>
<p className="text-gray-600">{input.orderEmail}</p>
<p className="text-gray-600">{input.payerPhone}</p>
  </div>
</div>
          ) : (
<div className="p-4">
  <h2 className="text-2xl font-bold mb-4">Forma de pago</h2>
  <div className="mb-4">
    <p>
      Obtén 3 y 6 meses sin intereses en compras mayores a $3,000.
      Sólo para miembros.
    </p>
    <p>
      *Promoción con tarjetas de crédito. Consulta bancos
      participantes.
    </p>
    <p className="mt-4">Términos y Condiciones</p>
  </div>
  <div>
    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 mb-4">
      Tarjeta de crédito o débito
    </button>
    <h2 className="text-2xl font-bold mb-4">Ingresa tus datos de pago:</h2>
    <div className="mb-4">
      <div className="form-group">
        <CardElement className="form-control payment-input" />
      </div>
    </div>
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 w-full text-sm"
      disabled={!stripe}
      onClick={handleSubmit}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">loading...</span>
          </div>
        </div>
      ) : (
        "Buy"
      )}
    </button>
  </div>
  <p class="mt-4">
    Si haces clic en Realizar pedido, aceptas los Términos y
    condiciones de eShopWorld.
  </p>
</div>
          )}
        </div>
<div className="w-1/2 max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
  {/* Resumen del pedido */}
  <div className="p-4 bg-gray-100 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-semibold">Subtotal:</span>
                <span>${productPrice}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Entrega/Envío:</span>
                <span>{input.deliveryOption}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Total:</span>
                <span>${productPrice}</span>
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
