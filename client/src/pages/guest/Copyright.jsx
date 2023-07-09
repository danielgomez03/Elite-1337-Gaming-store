import React from "react";

const Copyright = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Copyright / Creative Commons</h1>

      <p className="mb-4">&copy; 2023 1337 Hardware. All rights reserved.</p>

      <p className="mb-4">
        The content, graphics, design, and other materials on this website are
        protected by copyright and other intellectual property laws. Any
        unauthorized use, reproduction, or distribution of the materials on this
        website is strictly prohibited.
      </p>

      <p className="mb-4">
        Certain icons used on this website are licensed under the Creative
        Commons Attribution 4.0 International (CC BY 4.0) license.
      </p>

      <p className="mb-4">
        Please note that all product names, logos, and brands are property of
        their respective owners. Use of these names, logos, and brands does not
        imply endorsement or affiliation.
      </p>

      <p>
        For inquiries regarding the use of content or materials on this website,
        please contact us at{" "}
        <a href="mailto:contact@1337hardware.com" className="text-blue-500">
          contact@1337hardware.com
        </a>
        .
      </p>
    </div>
  );
};

export default Copyright;
