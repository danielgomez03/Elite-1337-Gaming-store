import React from 'react';

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

      <p className="mb-4">
        Welcome to 1337 HARDWARE: Elite Gaming Store! These Terms & Conditions govern your use of our website and the purchase of products from our store. By accessing our website and making a purchase, you agree to comply with these Terms & Conditions.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">1. Product Information:</h2>
        <ul className="list-disc ml-8">
          <li>
            We strive to provide accurate product descriptions, images, and pricing information on our website. However, we cannot guarantee that all information is error-free or complete.
          </li>
          <li>
            Product availability is subject to change without notice.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">2. Payment and Pricing:</h2>
        <ul className="list-disc ml-8">
          <li>
            All prices listed on our website are in the specified currency and inclusive of applicable taxes, unless stated otherwise.
          </li>
          <li>
            Payments are processed securely through Stripe. We do not store your payment information.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">3. Shipping and Delivery:</h2>
        <ul className="list-disc ml-8">
          <li>
            We offer shipping services to the specified locations as indicated during the checkout process.
          </li>
          <li>
            Shipping costs and estimated delivery times may vary depending on the destination and selected shipping method.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">4. Returns and Refunds:</h2>
        <ul className="list-disc ml-8">
          <li>
            Our returns and refunds policy is outlined on our website. Please review this policy before making a purchase.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">5. Intellectual Property:</h2>
        <ul className="list-disc ml-8">
          <li>
            All content on our website, including text, images, logos, and trademarks, is the property of 1337 HARDWARE: Elite Gaming Store and protected by intellectual property laws. You may not use or reproduce any content without our prior written consent.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">6. Limitation of Liability:</h2>
        <ul className="list-disc ml-8">
          <li>
            To the fullest extent permitted by law, 1337 HARDWARE: Elite Gaming Store shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of our website or the products purchased from our store.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsConditions;