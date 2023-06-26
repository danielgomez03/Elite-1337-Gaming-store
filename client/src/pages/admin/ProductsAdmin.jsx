import React, { useState } from 'react';
import CreateProduct from "../../components/CreateProduct"
import Link from 'next/link'

function ProductsAdmin() {
  const [selectedButton, setSelectedButton] = useState(false);

  const openCreateProduct = () => {
    setSelectedButton(true);
  };

  const closeCreateProduct = () => {
    setSelectedButton(false);
  };

  return (
    <div>
      <button onClick={ openCreateProduct }>Add Product</button>
      {selectedButton && (
        <CreateProduct 
          onClose={closeCreateProduct}
        />
      )}
    </div>
  )
}

export default ProductsAdmin