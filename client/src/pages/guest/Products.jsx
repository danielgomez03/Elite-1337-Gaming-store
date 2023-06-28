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

      <article class="w-1/4 rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
      <a href="#">
        <div class="relative flex items-end overflow-hidden rounded-xl">
          <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
          <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="ml-1 text-sm text-slate-400">4.9</span>
          </div>
        </div>

        <div class="mt-1 p-2">
          <h2 class="text-slate-700">The Hilton Hotel</h2>
          <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div class="mt-3 flex items-end justify-between">
              <p class="text-lg font-bold text-blue-500">$850</p>
   

            <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              <button class="text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </a>
    </article>


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

