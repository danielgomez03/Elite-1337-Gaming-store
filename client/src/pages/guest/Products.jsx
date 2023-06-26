import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProducts, clean } from '../../redux/actions';
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

  const products = useSelector(state => state.filteredProducts);
  const sortOrder = useSelector(state => state.sortOrder);

  const handleFilter = () => {
    dispatch(filterProductsByPrice(minPrice, maxPrice));
  };

  const handleSortOrderChange = (e) => {
    dispatch(changeSortOrder(e.target.value));
  };

  return (
    <div>
      <div>
        <label htmlFor="minPrice">Min Price:</label>
        <input type="number" id="minPrice" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      </div>
      <div>
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
      <button onClick={handleFilter}>Filter</button>
      <div>
        <label htmlFor="sortOrder">Sort Order:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      {products.map(product => (
        <div key={product.productId} className='cont_detail'>
          <div className='img'>
            <img src={product.images[0]} alt="img not found" />
          </div>
          <div className='cont_text'>
            <div className='text'>
              <p>name: {product.name}</p>
              <p>description: {product.description}</p>
              <p>manufacturer: {product.manufacturer}</p>
              <p>origin: {product.origin}</p>
              <p>price: {product.price}</p>
              <p>discount: {product.discount}</p>
              <p>stock: {product.stock} pzs</p>
              <p>category: {product.categoryId}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestProducts;
