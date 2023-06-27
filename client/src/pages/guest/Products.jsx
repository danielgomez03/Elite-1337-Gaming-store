import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProducts, clean, filterProductsByPrice, changeSortOrder } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';





const GuestProducts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clean());
    };
  }, [dispatch]);

  const products = useSelector(state => state.products);
  const sortOrder = useSelector(state => state.sortOrder);

  const handleFilter = () => {
    dispatch(filterProductsByPrice(minPrice, maxPrice));
  };

  const handleSortOrderChange = (e) => {
    dispatch(changeSortOrder(e.target.value));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col mb-4">
        <label htmlFor="minPrice" className="text-gray-700">
          Min Price:
        </label>
        <input
          type="number"
          id="minPrice"
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
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="grid gap-4">
    {products.map(product => (
      <div key={product.productId} className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <p className="text-gray-700"><span className="font-bold">Manufacturer:</span> {product.manufacturer}</p>
          <p className="text-gray-700"><span className="font-bold">Origin:</span> {product.origin}</p>
          <p className="text-gray-700"><span className="font-bold">Price:</span> {product.price}</p>
          <p className="text-gray-700"><span className="font-bold">Discount:</span> {product.discount}</p>
          <p className="text-gray-700"><span className="font-bold">Stock:</span> {product.stock} pzs</p>
          <p className="text-gray-700"><span className="font-bold">Category:</span> {product.categoryId}</p>
        </div>
      </div>
    ))}
  </div>
    </div>
  );
};

export default GuestProducts;

