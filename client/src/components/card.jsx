import React, { useState, useEffect } from 'react';
import Link from "next/link";

import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, getCartByIdUser, addFavorite, deleteFavorite } from "@/redux/actions";

import Rating from '@/components/Rating';
import HandleFavorite from '@/components/handleFavorite';

const Card = (props) => {
  const userId = useSelector((state) => state.userId);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    if (userId) {
      setShowElements(true);
    }
  }, [userId]);

  const favorites = useSelector((state) => state.favorites);
  const [isFav, setIsFav] = useState(false);




  useEffect(() => {
    const isProductInFavorites = favorites.some(
      (favorite) => favorite.productId === props.id
    );
    setIsFav(isProductInFavorites);
  }, [favorites, props.id]);


  const dispatch = useDispatch();

  return (
    <article className="h-96 w-52 rounded-xl bg-white shadow-lg hover:shadow-xl hover:transform hover:scale-95 duration-300">
      <div className="relative flex items-end overflow-hidden rounded-xl">
        <Link href={`../users/Details/${props.id}`}>
          <img src={props.image} alt="Product Photo" className="w-full h-44 p-3 object-contain" />
        </Link>
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
          <Rating objProduct={props.objProduct} />
        </div>



        {props.discount > 0.0 && (
          <div className="absolute top-5 right-5 transform translate-x-2 -translate-y-2">
            <div className="bg-[#FF5F00] text-white px-2 py-1 rounded-full flex items-center">
              <span className="text-xs font-bold">{props.discount}% off</span>
              <span className="ml-1 text-xs">SALE</span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-1 pb-0 flex-col justify-between items-between flex flex-col h-48 gap-auto">
        <h2 className="h-10 text-slate-700 px-5 font-bold">{props.name}</h2>
        {showElements && (
          <div className="favorite-button-container absolute bottom-1/3 right-2 transform -translate-x-1/2">
            <HandleFavorite isFav={isFav} setIsFav={setIsFav} id={props.id} />
          </div>
        )}
        <p className="h-6 mt-1 px-5 text-xs text-slate-400">Stock: {props.stock}</p>
        <p className="h-6 mt-1 px-5 text-xs text-slate-400">Made in {props.origin}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="w-1/2 text-[17px] text-center font-bold text-blue-500">$ {props.price}</p>
          <div className="w-1/2 pr-3">
              
                <button
                  className="flex items-center justify-center rounded-lg border border-indigo-500 w-full py-1 text-indigo-500 duration-100 hover:bg-blue-600 flex-grow text-sm"
                  disabled={props.stock === 0}
                  onClick={() => {
                    const user = userId?userId:"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a"
                    dispatch(addProductToCart(user,props.id)).then(() => {
                      dispatch(getCartByIdUser(user));
                    });
                  }}
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 mr-1"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                  </svg>
                  Add
                </button>
                      {showElements && (
                        <>
                <button
                  className="flex items-center justify-center rounded-lg bg-blue-500 w-full mt-2 py-1 text-white duration-100 hover:bg-blue-600 text-sm"
                  disabled={props.stock === 0}
                  onClick={() => {
                    const user = userId?userId:"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a"
                    dispatch(addProductToCart(user,props.id)).then(() => {
                      dispatch(getCartByIdUser(user));
                    });
                  }}
                >
                  Buy Now
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;


 
  //   {props.description}
  //   {props.manufacturer}
  //   {props.discount}
  //   {props.stock} 
  //   {props.categoryId}
