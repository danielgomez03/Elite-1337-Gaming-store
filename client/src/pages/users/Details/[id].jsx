import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getProductById, clean } from '../../../redux/actions';
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
// const cat= {detail,category}
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex">
  {detail && detail.images?.map((image, index) => (
  <div key={index}>
    <img src={image.url} alt={image.caption} />
  </div>
))}
  <div>
<p className="mb-2 font-bold font-montserrat">{detail.name}</p>
<p className="mb-2 font-roboto">description: {detail.description}</p>
<p className="mb-2 font-roboto">{detail?.category?.name} ---- {detail?.category?.parent.name}</p>
<p className="mb-2 font-roboto">manufacturer: {detail.manufacturer}</p>
<p className="mb-2 font-roboto">origin: {detail.origin}</p>
<p className="mb-2 font-roboto">price: ${detail.price}</p>
<p className="mb-2 font-roboto">discount: {detail.discount} %</p>
<p className="mb-2 font-roboto">stock: {detail.stock} pzs</p>
  </div>
</div>
  );
}