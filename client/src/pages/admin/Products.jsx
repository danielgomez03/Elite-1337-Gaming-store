import React, { useState } from 'react';
import CreateProduct from "../../components/CreateProduct"
import Link from 'next/link'

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
      {selectedButton && (
        <CreateProduct 
          onClose={closeCreateProduct}
        />
      )}
      <button onClick={ openCreateProduct }>Add Product</button>
    </div>
  )
}

export default Products