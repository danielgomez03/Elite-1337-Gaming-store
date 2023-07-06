import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductById, clean , addProductToCart , getCartByIdUser , getCommentsByProduc} from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Rating from '@/components/Rating';
import axios from 'axios';




export default function Detail() {
  const dispatch = useDispatch();
  const router = useRouter();
  // manejar con redux a futuro 
  const purchased = true;
  const userId = "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a"
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
     
      dispatch(getCartByIdUser(userId));
     
    
    if (id) {
      dispatch(getProductById(id));
      
    }
   dispatch(clean())
  }, [dispatch, id]);
  
  const detail = useSelector(state => state.detail);
  console.log(detail);
  useEffect(()=> {
    if(detail.productId){
    dispatch(getCommentsByProduc(detail.productId))
    }
    
  },[dispatch,detail.productId])
  const comments = useSelector(state=>state.commentsByProduct)
  console.log(comments)
  const [content,setContent] = useState()
  const onChange = (e) => {
     
     setContent(e.target.value)
  }
 
  const onSubmitComment=(e) => {
    e.preventDefault();
    const comment = {userId:userId,productId:detail.productId,content:content}
    axios.post("http://localhost:3001/comments/add", comment )
    .then(()=>{
      dispatch(getCommentsByProduc(detail.productId))
    setContent("")
    })
    .catch(error=>alert(error.data))
    

  }
  if (!detail) {
    return <div>Loading...</div>;
  }
  const originalPrice = parseFloat(detail.price);
  const discountPercentage = parseFloat(detail.discount);
  const discountedPrice = originalPrice - (originalPrice * (discountPercentage / 100));
  return (
  <div>
    <div className="bg-white p-4 rounded-lg shadow-md flex items-start">
    {detail && detail.images?.map((image, index) => (
  <div key={index} className="relative flex items-end overflow-hidden rounded-xl">
  <img className="w-80 h-80 object-contain mr-4 align-top" src={image.url} alt={image.caption} />
</div>
    ))}
    <div className="flex flex-grow">
      <div className="container mx-auto bg-white rounded-lg p-4 relative justify-end">
        {detail.discount > 0.0 && (
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <div className="bg-[#FF5F00] text-white px-2 py-1 rounded-full flex items-center">
              <span className="text-xs font-bold">{detail.discount}% off</span>
              <span className="ml-1 text-xs">SALE</span>
            </div>
          </div>
        )}
        <p className="mb-6 font-bold font-montserrat text-xl">{detail.name}</p>
        <Rating objProduct={id} />
        <p className="mb-2 font-roboto">Description: {detail.description}</p>
        <p className="mb-2 font-roboto">{detail?.category?.name} ---- {detail?.category?.parent.name}</p>
        <p className="mb-2 font-roboto">manufacturer: <span className='font-bold'>{detail.manufacturer}</span></p>
        <p className="mb-2 font-roboto">from {detail.origin}</p>
  
        {detail.discount > 0.0 ? (
          <p className="mb-2 font-roboto">
            before:
            <span className="line-through">{detail.price}</span>
            <span className="text-[#FF5F00]">({detail.discount}% off)</span>
            <br/>
            now!
            <span className="text-[#FF5F00] text-xl"> ${discountedPrice.toFixed(2)}</span>
          </p>
        ) : (
          <p>
            <span>list price</span>
            <span className="font-bold text-xl"> ${detail.price}</span>
          </p>
        )}
  
        <div className="flex justify-end space-x-4">
          <button
            className="bg-[#00315E] hover:bg-[#174E84] text-white px-4 py-2 rounded"
            disabled={detail.stock === 0}
            onClick={() => {
              dispatch(addProductToCart(id)).then(() => {
                dispatch(getCartByIdUser(userId));
              });
            }}
          >
            ADD TO CART
          </button>
    <Link
  href={{
    pathname: '/users/Payment/StripePay',
    query: {
      productId: id,
      productName: detail.name,
      productPrice: discountedPrice.toFixed(2),
      productDescription: detail.description,
      productImage: detail.images?.[0]?.url  // Aquí se pasa la URL de la primera imagen del producto
    }
  }}
  passHref
>
    <button className="bg-[#FF5F00] hover:bg-[#FF8129] text-white px-4 py-2 rounded" disabled={detail.stock === 0}>
      BUY NOW
    </button>
    </Link>
    {detail.stock === 0 && (
    <p className="absolute top-full left-0 text-red-500">out of stock</p>
  )}
  </div>
  </div>
  </div>
  </div>
  <div>
  <div className="max-h-50 overflow-y-scroll mt-4">
  <h2 className="mb-2">Reviews:</h2>
  <ul className="bg-gray-100 p-4 rounded-lg">
    {comments?.map((comment) => (
      <li key={comment.commentId} className="mb-4 p-2 border border-gray-300 rounded-lg">
        <p className="text-gray-800">{comment.content}</p>
        {/* Otros elementos y estilos para cada comentario, como autor, fecha, etc. */}
      </li>
    ))}
  </ul>
</div>
  {purchased &&
   <form onSubmit={onSubmitComment}>
   <div className="comment-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
    
     <textarea
       onChange={onChange}
       value={content}
       placeholder="Enter your comment"
       className="comment-input"
       style={{
         width: '100%',
         height: '100px',
         padding: '8px',
         border: '1px solid #ccc',
         borderRadius: '4px',
         resize: 'vertical',
       }}
     />
     <button
       type="submit"
       className="comment-submit"
       style={{
         backgroundColor: '#007bff',
         color: '#fff',
         padding: '8px 16px',
         border: 'none',
         borderRadius: '4px',
         cursor: 'pointer',
       }}
     >
       Send
     </button>
   </div>
 </form>
  }
    </div>
</div>
  );
}