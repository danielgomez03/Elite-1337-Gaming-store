import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardContainer from '../components/CardsContainer';
import leetImage from '../../public/leet2.png';
import Image from 'next/image';

function Index() {
  const products = useSelector(state => state.products);

  const productsWithDiscount = products.filter(product => product.discount !== '0.0');
  const sortedProducts = productsWithDiscount.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));

  const threshold = 500; // Umbral de precio para separar los productos

  const cheapProducts = products.filter(product => parseFloat(product.price) <= threshold);
  const expensiveProducts = products.filter(product => parseFloat(product.price) > threshold);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='relative w-full h-[23rem] overflow-hidden flex items-center justify-center' style={{ backgroundImage: "url(https://static.vecteezy.com/system/resources/previews/003/800/688/non_2x/abstract-digital-binary-data-on-computer-screen-illustration-vector.jpg)" }}>
        <div className="flex justify-center items-center">
          <div className=" mr-10">
            <Image className="w-56" src={leetImage} alt="leet" />
          </div>
          <h1 className=' mb-8 text-white text-8xl font-bold tracking-wider uppercase'>
            Hardware
          </h1>
        </div>
      </div>

      <CardContainer data={sortedProducts} itemsPerPage={5} info="discount" />
      <CardContainer data={cheapProducts} itemsPerPage={5} info="cheap" />
      <CardContainer data={expensiveProducts} itemsPerPage={5} info="expensive" />

      <img className="w-1/4 mb-4 object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt1nxzdSsFbMcl5ur0nVu4oRm9sItTEeXIhpmRkqxSL0rrKlRMNYchPs6Sg5zz5JcLW7g&usqp=CAU" />
    </div>
  );
}

export default Index;
