import React from 'react';
import { useSelector } from 'react-redux';



function  ShopCart() {
  const cart =  useSelector(state=>state.cart)

  console.log(cart)
  // const data = await axios.get("http://localhost:3001/carts/user/ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a")
  // const cartUser = data.data
  //usar un estado local para ir agregando los productos al carrito y posteriormente hacer la compra?
  return (
    <div>
      <h2>Your shopping cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {/* {cart.map((p) => (
            <li key={p.productId}>
              {p.productId} - {p.quantity}
              
            </li>
          ))} */}
        </ul>
      )}
    </div>
  );
}

export default ShopCart;