import React, { useEffect, useState } from 'react';
import { getProducts, clean, filterProductsByPrice, sortProducts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/card';

const Products = () => {
  const dispatch = useDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(getProducts());
    return () => {
      dispatch(clean());
    };
  }, [dispatch]);

  const products = useSelector(state => state.filteredProducts);
  const [sortOrder, setSortOrder] = useState('');

  const handleFilter = () => {
    dispatch(filterProductsByPrice(minPrice, maxPrice));
  };

  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    dispatch(sortProducts(order));
    setSortOrder(order);
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
  <option value="">Sort Order</option>
  <option value="ascending">Ascending</option>
  <option value="descending">Descending</option>
</select>
      </div>

      <div className="grid gap-4">
    {products.map((product, index) => {
            return (
              <Card
                key={product.productId}
                id={product.productId}
                name={product.name}
                description={product.description}
                manufacture={product.manufacturer}
                origin={product.origin}
                price={product.price}
                discount={product.discount}
                stock={product.stock}
                categoryId={product.categoryId}
              />
            );
          })}
  </div>
    </div>
  );
};

export default Products;

