import React, { useState } from "react";
import CreateProduct from "../../components/CreateProduct";
import Link from "next/link";

function Products() {
  const [selectedButton, setSelectedButton] = useState(false);

  const openCreateProduct = () => {
    setSelectedButton(true);
  };

  const closeCreateProduct = () => {
    setSelectedButton(false);
  };

  return (
    <div>
      {selectedButton && <CreateProduct onClose={closeCreateProduct} />}
      <button
        onClick={openCreateProduct}
        className="w-full px-4 mt-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
      >
        Add Product
      </button>
    </div>
  );
}

export default Products;
