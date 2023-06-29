import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductById, clean , addProductToCart } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';




export default function Detail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    
    if (id) {
      dispatch(getProductById(id));
     
    }
   dispatch(clean())
  }, [dispatch, id]);

  const detail = useSelector(state => state.detail);
  console.log(detail);

  if (!detail) {
    return <div>Loading...</div>;
  }
  const originalPrice = parseFloat(detail.price);
  const discountPercentage = parseFloat(detail.discount);
  const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex">
  {detail && detail.images?.map((image, index) => (
  <div key={index}>
    <img src={image.url} alt={image.caption} />
  </div>
))}
 <div className="container mx-auto bg-white rounded-lg p-4 relative">
  {detail.discount && (
    <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
      <div className="bg-[#FF5F00] text-white px-2 py-1 rounded-full flex items-center">
        <span className="text-xs font-bold">{detail.discount}% off</span>
        <span className="ml-1 text-xs">SALE</span>
      </div>
    </div>
  )}
<p className="mb-2 font-bold font-montserrat">{detail.name}</p>
<p className="mb-2 font-roboto">description: {detail.description}</p>
<p className="mb-2 font-roboto">{detail?.category?.name} ---- {detail?.category?.parent.name}</p>
<p className="mb-2 font-roboto">manufacturer: {detail.manufacturer}</p>
<p className="mb-2 font-roboto">origin: {detail.origin}</p>


<p className="mb-2 font-roboto">
   before:
  <span className="line-through">{detail.price}</span> 
  <span className="text-red-500">({detail.discount}% off)</span>
  <br/>
  now 
  <span className="text-red-500"> ${discountedPrice.toFixed(2)}</span>
  </p>

<div className="flex justify-end space-x-4">
<button className="bg-[#00315E] hover:bg-[#174E84] text-white px-4 py-2 rounded " disabled={detail.stock === 0}
onClick={()=>
  {dispatch(addProductToCart(detail.productId))}
}
>

      ADD TO CART
    </button>
    <button className="bg-[#FF5F00] hover:bg-[#FF8129] text-white px-4 py-2 rounded" disabled={detail.stock === 0}>
      BUY
    </button>
    {detail.stock === 0 && (
    <p className="absolute top-full left-0 text-red-500">out of stock</p>
  )}
  </div>
  </div>
</div>
  );
}