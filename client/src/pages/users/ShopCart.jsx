import React from 'react';
import { useSelector } from 'react-redux';



function  ShopCart() {
  // const cart =  useSelector(state=>state.cart)
  const cart = [{"cartId":"bad41f58-ae97-448c-b64b-3f7f811abc96","quantity":1,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"263f0f02-99f4-4811-b886-f2c36c2cfc26","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"AMD Ryzen 9 5900X","price":"549.99","discount":"10.0","stock":50}},{"cartId":"b908b067-6cf6-48f4-942a-82e57952599e","quantity":88,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"7d23e873-6bb8-4569-acf5-ebeef606afd6","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"ASUS ROG Strix X570-E Gaming","price":"349.99","discount":"5.0","stock":30}},{"cartId":"d472233f-5558-448a-8124-ee2731f6a31e","quantity":52,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"1c7047e0-6978-4e3b-811d-59dccb5e7637","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"ASUS TUF Gaming VG27AQL1A","price":"599.99","discount":"0.0","stock":10}},{"cartId":"b8a163b5-8064-4184-a577-e508f20d85e8","quantity":31,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"c21f20e7-a050-4ce3-81ef-48ce70593f4d","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"Corsair Vengeance RGB Pro","price":"149.99","discount":"0.0","stock":60}},{"cartId":"86d8b5b4-7d63-4dc4-a2e9-373b8ea35f28","quantity":1,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"09e361ca-e3d4-4ff8-b335-7803f17ac69d","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"NZXT H510","price":"79.99","discount":"10.0","stock":25}},{"cartId":"fe9b8902-38ea-4b3a-b54f-bda5ab20998d","quantity":2,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"f0cc13fb-20c0-46b6-86ba-7095c637b193","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"Razer DeathAdder V2","price":"69.99","discount":"10.0","stock":40}},{"cartId":"7daacaf8-3f5d-4506-b4e2-736975a7e7bc","quantity":2,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"5a6285bc-f411-4b89-8b9e-04c1750d2ee2","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"Samsung 970 EVO Plus","price":"99.99","discount":"0.0","stock":100}},{"cartId":"152371be-0826-4ab1-baf2-e2e2cc13252f","quantity":1,"userId":"ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a","productId":"f0794545-1a2a-454e-aec5-1fbb5618319d","user":{"firstName":"Ignacio","lastName":"Fosco"},"product":{"name":"Seagate BarraCuda 2TB","price":"64.99","discount":"20.0","stock":80}}]
  console.log(cart.length)
  // const data = await axios.get("http://localhost:3001/carts/user/ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a")
  // const cartUser = data.data
  //usar un estado local para ir agregando los productos al carrito y posteriormente hacer la compra?
  const calculateTotalProducts = (cart) => {
    let totalProducts = 0;
    for (const product of cart) {
      totalProducts += product.quantity;
    }
    return totalProducts;
  };
  
  const calculateTotalPrice = (cart) => {
    let totalPrice = 0;
    for (const product of cart) {
      const price = parseFloat(product.product.price);
      const quantity = parseInt(product.quantity);
      totalPrice += price * quantity;
    }
    return totalPrice.toFixed(2);
  };
  return (
    <div className="border border-gray-300 rounded">
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <ul className="divide-y divide-gray-300">
      {cart.map((product) => (
        <li key={product.cartId} className="flex items-center py-4">
          <img
            src={product.product.image}
            alt={product.product.name}
            className="w-16 h-16 object-contain mr-4"
          />
          <div className="flex-1">
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
                  onChange={(e) => handleQuantityChange(product.cartId, e.target.value)}
                >
                  {[...Array(product.product.stock)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <span className="font-bold">${product.product.price}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
<div className="flex justify-between items-center mt-4">
        <div>
          <span className="font-bold">Total Products:</span>{" "}
          <span>{calculateTotalProducts(cart)}</span>
        </div>
        <div>
          <span className="font-bold">Total Price:</span>{" "}
          <span>${calculateTotalPrice(cart)}</span>
        </div>
      </div>

</div>
  );
}

export default ShopCart;