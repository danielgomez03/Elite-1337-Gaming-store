import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../redux/actions';
import Products from './guest/Products';

function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <Products/>
    </div>
  )
}

export default Home