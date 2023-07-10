import React from "react";

const Policy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At 1337 HARDWARE: Elite Gaming Store, we are committed to protecting the
        privacy of our customers. This Privacy Policy outlines how we collect,
        use, and safeguard the personal information you provide to us when
        accessing our website or making a purchase. By using our website, you
        consent to the collection and use of your personal information as
        described in this Privacy Policy.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. Information We Collect:</h2>
        <ul className="list-disc ml-8">
          <li>
            When you visit our website, we may collect certain information
            automatically, including your IP address, browser type, operating
            system, and referring website addresses.
          </li>
          <li>
            If you make a purchase, we collect personal information such as your
            name, email address, shipping address, and payment details.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">2. Use of Information:</h2>
        <ul className="list-disc ml-8">
          <li>
            We use the information we collect to process your orders,
            communicate with you, and provide a personalized shopping
            experience.
          </li>
          <li>
            Your personal information may also be used for analytics, marketing,
            and improving our website and services.
          </li>
          <li>
            We do not sell or disclose your personal information to third
            parties, except as necessary to fulfill your orders or comply with
            legal obligations.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">3. Data Security:</h2>
        <ul className="list-disc ml-8">
          <li>
            We employ industry-standard security measures to protect your
            personal information from unauthorized access, disclosure, or
            alteration.
          </li>
          <li>
            However, no method of transmission over the internet or electronic
            storage is 100% secure, so we cannot guarantee absolute security.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">4. Cookies:</h2>
        <ul className="list-disc ml-8">
          <li>
            Our website uses cookies to enhance your browsing experience and
            provide personalized features.
          </li>
          <li>
            You can manage or disable cookies through your browser settings, but
            please note that certain website functionalities may be affected.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
