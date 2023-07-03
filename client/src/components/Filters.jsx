import React, { useEffect, useState } from 'react';
import { filterProductsByPrice, sortProducts } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Filters() {
  const dispatch = useDispatch(); // Agrega esta línea para obtener la función dispatch

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [sortOrder, setSortOrder] = useState('');

  const handleFilter = () => {
    dispatch(filterProductsByPrice(minPrice, maxPrice));
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    dispatch(sortProducts(order));
    setSortOrder(order);
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={togglePopup} className="fixed right-[-2px] top-1/2 bg-white w-32 shadow-lg rounded-bl-md rounded border-t">
        <span className="material-symbols-rounded font-x-6 float-left p-3">
          tune
        </span>
      </button>


      {isOpen && (
        <div className='fixed top-32 right-0 z-50 bg-white h-auto p-4 shadow-lg rounded-bl-md rounded-br-md border-t flex flex-col items-center justify-center'>
          <div className="flex flex-col mb-4">
            <label htmlFor="minPrice" className="text-gray-700">
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              min={0}
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="maxPrice" className="text-gray-700">
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              min={0}
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Filter
          </button>

          <div className="flex flex-col mt-4">
            <label htmlFor="sortOrder" className="text-gray-700">
              Sort Order:
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Sort Order</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filters