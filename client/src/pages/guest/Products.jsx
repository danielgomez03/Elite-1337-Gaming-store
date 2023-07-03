import React, { useEffect, useState } from 'react';
import { getProducts, clean, filterProductsByPrice, sortProducts, getCartByIdUser } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/card';
import Filters from '../../components/Filters';

const Products = () => {
  const id = "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartByIdUser(id));
    dispatch(getProducts());
    return () => {
      dispatch(clean());
    };
  }, [dispatch]);

  const products = useSelector(state => state.filteredProducts);

  return (
    <div>
      <Filters />
      <div className="px-56 grid gap-4 p-4 grid-cols-4">
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
              image={product.images[0].url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Products;

