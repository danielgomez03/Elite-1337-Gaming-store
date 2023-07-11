import React, { useEffect, useState } from 'react';
import { getRatings, clean, filterProductsByPrice, sortProducts, getCartByIdUser} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/card';
import Filters from '../../components/Filters';



const Products = () => {
  const id = "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartByIdUser(id)); 
    return () => {
      dispatch(clean());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRatings());
  }, []);

  const productsbyName = useSelector(state => state.productsbyName);
  const filteredProducts = useSelector(state => state.filteredProducts);
  const actionByName = useSelector(state => state.actionByName);
  const products = actionByName ? productsbyName : filteredProducts;

  return (
    <div>
      <Filters />
      <div className="px-auto grid lg:grid-cols-5 md:grid-cols-2 xs:grid-cols-1 gap-3 p-4 ">
        {products?.map((product, index) => {
          return (
            <div key={product.productId}>
              <Card
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
                objProduct={product.productId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;