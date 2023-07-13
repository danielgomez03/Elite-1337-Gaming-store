import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { contactValidation } from "./validations";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation on form fields
    const errors = contactValidation({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors)[0][0];
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
      return;
    }

    // Create the contact form data object
    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    };

    // Make a POST request to the backend API
    axios
      .post("/contact/form", formData)
      .then((response) => {
        // Handle successful response
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Contact form submitted successfully!",
        });
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setMessage("");
        setIsOpen(false); // Close the popup after success
      })
      .catch((error) => {
        // Handle error
        let errorMessage = "Error submitting contact form";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      });
  };

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenPopup}
        className="text-1xl font-bold text-center text-gray-200"
      >
        Contact
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="w-96 bg-indigo-800 py-8 px-6 rounded">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
              Contact Form
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="py-3 px-4 rounded bg-gray-200 text-gray-800"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="py-3 px-4 rounded bg-gray-200 text-gray-800"
                placeholder="Last Name"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-4 rounded bg-gray-200 text-gray-800"
                placeholder="Email"
                required
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="py-3 px-4 rounded bg-gray-200 text-gray-800"
                placeholder="Phone Number"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="py-3 px-4 rounded bg-gray-200 text-gray-800"
                placeholder="Message"
                maxLength={500}
                required
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-gray-200 py-3 px-4 rounded"
                >
                  Submit
                </button>
                <button
                  onClick={handleClosePopup}
                  className="bg-red-500 hover:bg-red-600 text-gray-200 py-3 px-4 rounded ml-2"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
