import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Returns Policy</h1>

      <p className="mb-4">
        Thank you for shopping at 1337 Hardware. We want you to be completely
        satisfied with your purchase. If you are not entirely satisfied with
        your purchase, we're here to help.
      </p>

      <h2 className="text-xl font-bold mb-2">1. Eligibility for Returns</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          You have 30 calendar days to return an item from the date you received
          it.
        </li>
        <li>
          To be eligible for a return, your item must be unused and in the same
          condition that you received it. It must also be in the original
          packaging.
        </li>
      </ul>

      <h2 className="text-xl font-bold mb-2">2. Return Process</h2>
      <p className="mb-4">
        To initiate a return, please email our sales team at{" "}
        <a href="mailto:sales@1337gaming.com" className="text-blue-500">
          sales@1337gaming.com
        </a>{" "}
        and provide the following information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Order number</li>
        <li>Reason for return</li>
        <li>Description of the issue or defect, if applicable</li>
      </ul>

      <h2 className="text-xl font-bold mb-2">3. Refunds</h2>
      <p className="mb-4">
        Once we receive your item, we will inspect it and notify you that we
        have received your returned item. We will also notify you of the
        approval or rejection of your refund.
      </p>
      <p className="mb-4">
        If your return is approved, we will initiate a refund to your original
        method of payment. Please note that it may take a few business days for
        the refund to be processed and for the amount to reflect in your
        account.
      </p>

      <h2 className="text-xl font-bold mb-2">4. Shipping Costs</h2>
      <p className="mb-4">
        The shipping costs for returning an item are the responsibility of the
        customer, unless the return is due to a defect or an error on our part.
      </p>

      <h2 className="text-xl font-bold mb-2">5. Exchanges</h2>
      <p className="mb-4">
        If you wish to exchange an item, please follow the return process
        mentioned above and indicate your preference for an exchange in your
        email.
      </p>
      <p className="mb-4">
        Exchanges are subject to product availability. If the requested item is
        not available, we will process a refund for the returned item.
      </p>

      <h2 className="text-xl font-bold mb-2">6. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about our Returns Policy, please contact our
        customer support team at{" "}
        <a href="mailto:support@1337gaming.com" className="text-blue-500">
          support@1337gaming.com
        </a>{" "}
        or reach out to our general contact email at{" "}
        <a href="mailto:contact@1337gaming.com" className="text-blue-500">
          contact@1337gaming.com
        </a>
        .
      </p>

      <p className="mb-4">
        Please note that this Returns Policy applies to online purchases made
        through our website. For in-store purchases, please refer to our
        in-store return policy.
      </p>

      <p>
        We reserve the right to update or modify this Returns Policy at any time
        without prior notice. Please review this policy periodically for any
        changes or updates.
      </p>

      <p className="text-sm mt-8">Last updated: June 2023</p>
    </div>
  );
};

export default ReturnPolicy;
