import React, { useState } from 'react';
import Card from './card';

const PaginationComponent = ({ data, itemsPerPage, info }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  let title = "";

  if (info === "discount") {
    title = "Discover Our Sale: Products with Unbelievable Discounts";
  } else if (info === "cheap") {
    title = "Budget-Friendly Bargains: Quality Products at Affordable Prices";
  } else {
    title = "Luxury and Excellence: High-End Products that Will Amaze You";
  }

  return (
    <div className='mt-6'>
      <h2 className="font-bold mb-4 ml-10">{title}</h2>
      <ul className="my-2 px-auto flex flex-wrap h-auto gap-3">
        {getPageData().map((product, index) => (
          <Card
            id={product.productId}
            name={product.name}
            description={product.description}
            manufacturer={product.manufacturer}
            origin={product.origin}
            price={product.price}
            discount={product.discount}
            stock={product.stock}
            categoryId={product.categoryId}
            image={product.images[0].url}
            objProduct={product.productId}
          />
        ))}
      </ul>
      <div className="flex justify-center my-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`h-2 w-2 mx-1.5 rounded-full ${index + 1 === currentPage ? 'bg-blue-500' : 'bg-gray-300'
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default PaginationComponent;
