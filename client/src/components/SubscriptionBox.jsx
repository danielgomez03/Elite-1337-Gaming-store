import React, { useState } from "react";
import axios from "axios";
import { mailValidation } from "./validations";

const SubscriptionBox = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = mailValidation({ email });

    if (Object.keys(errors).length > 0) {
      setError(errors.email[0]);
      return;
    }

    axios
      .post(
        "https://ft37bpfgrupo12-production.up.railway.app/mailing/newsletter/subscribe",
        { email },
      )
      .then((response) => {
        setMessage(response.data.message);
        setError("");
        setEmail("");
        setTimeout(() => {
          setMessage("");
        }, 5000); // Clear the message after 5 seconds
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("Error subscribing to the newsletter");
          console.error(error);
        }
        setMessage("");
        setTimeout(() => {
          setError("");
        }, 5000); // Clear the error after 5 seconds
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="w-70 mx-2 bg-indigo-800 py-4 px-4 rounded">
      <h2 className="text-1xl font-bold mb-4 text-center text-gray-200">
        Subscribe to Our Newsletter
      </h2>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="email"
          value={email}
          onChange={handleChange}
          className={`w-40 py-2 px-4 rounded-l text-gray-600 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-gray-200 py-2 px-3 rounded-r"
        >
          Subscribe
        </button>
      </form>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {message && <p className="text-green-500 mt-2 text-center">{message}</p>}
    </div>
  );
};

export default SubscriptionBox;
