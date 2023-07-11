import axios from 'axios';
import { getCartByIdUser, clean, modifyQuantity, deleteProduct } from '@/redux/actions';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

function ShopCart() {
  const userId = useSelector(state=>state.userId);
  const user=userId?userId:"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a"
  const dispatch = useDispatch();
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    // Obtener el carrito del almacenamiento local al cargar la página por primera vez
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(getCartByIdUser(user, JSON.parse(savedCart)));
    }

    async function fetchImages() {
      try {
        const response = await axios.get("http://localhost:3001/images/products");
        setImagesArray(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (user) {
      dispatch(getCartByIdUser(user));
    }

    fetchImages();
    dispatch(clean());
  }, [dispatch, user]);

  const cart = useSelector(state => state.cartUser);

  useEffect(() => {
    // Almacenar el carrito en el almacenamiento local cuando se actualice
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const calculateTotalProducts = (cart) => {
    let totalProducts = 0;
    for (const product of cart) {
      totalProducts += product.quantity;
    }
    return totalProducts;
  };

  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    for (const item of cart) {
      const productPrice = item.product.price;
      const quantity = item.quantity;
      const discount = item.product.discount;

      const itemPrice = productPrice * quantity;

      if (discount > 0) {
        const discountAmount = (productPrice * discount) / 100;
        totalPrice += itemPrice - (quantity * discountAmount);
      } else {
        totalPrice += itemPrice;
      }
    }
    return totalPrice.toFixed(2);
  };

  return (
    <div className="border border-gray-300 rounded">
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <span className="font-roboto text-lg">Shopping Cart</span>
            <span>price</span>
          </div>
          <ul className="divide-y divide-gray-300 flex-1">
            {cart.map((product) => {
              const originalPrice = parseFloat(product.product.price);
              const discountPercentage = parseFloat(product.product.discount);
              const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
              const image = imagesArray.find((item) => item.productId === product.productId);
              return (
                <li key={product.cartId} className="flex items-center py-4">
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <button
                        onClick={() => {
                          dispatch(deleteProduct({
                            userId: user,
                            productId: product.productId
                          })).then(() => {
                            dispatch(getCartByIdUser(user));
                          });
                        }}
                      >
                        <span className="material-symbols-rounded group-hover:text-gray-900 text-lg">delete</span>
                      </button>
                    </div>
                    <div className="ml-4">
                      <Link href={`Details/${product.productId}`}>
                        <img
                          src={image ? image.url : ''}
                          alt={product.product.name}
                          className="w-40 h-40 object-contain"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 w-full ml-8">
                    <h3 className="text-lg font-semibold">{product.product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <label htmlFor={`quantity-${product.cartId}`} className="mr-2">
                          Quantity:
                        </label>
                        <select
                          id={`quantity-${product.cartId}`}
                          className="border border-gray-300 rounded px-2 py-1"
                          value={product.quantity}
                          onChange={(e) => (
                            dispatch(modifyQuantity({
                              userId: id,
                              productId: product.productId,
                              quantity: e.target.value
                            })).then(() => {
                              dispatch(getCartByIdUser(user));
                            })
                          )}
                        >
                          {[...Array(product.product.stock)].map((_, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='ml-20'>
                        {product.product.discount > 0.0 ? (
                          <p className="mb-2 font-roboto">
                            <span className="line-through">${product.product.price}</span>
                            <span className="text-[#FF5F00] text-xl"> ${discountedPrice.toFixed(2)}</span>
                          </p>
                        ) : (
                          <p>
                            <span className="text-[#FF5F00] text-xl"> ${discountedPrice.toFixed(2)}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <div className="flex">
              <div>
                <span className="font-bold">Total Products:</span>{" "}
                <span className='text-xl'>{calculateTotalProducts(cart)}</span>
              </div>
              <div className="ml-4 mr-4">
                <span className="font-bold">Total Price:</span>{" "}
                <span className='text-xl'>${calculateTotalPrice(cart)}</span>
              </div>
            </div>
            <Link
              href={{
                pathname: '/users/checkout/checkCart',  
                query: {
                  totalPrice: calculateTotalPrice(cart),
                  totalProducts: calculateTotalProducts(cart),
                }
              }}
              passHref
            >
              <button className="bg-[#FF5F00] hover:bg-[#FF8129] text-white px-4 py-2 rounded self-start text-xl">
                BUY SHOPPING CART NOW
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopCart;