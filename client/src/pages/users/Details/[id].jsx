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
  }, [dispatch, id]);

  const detail = useSelector(state => state.detail);
  console.log(detail);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={detail.image} alt="img not found" />
      </div>
      <div>
        <div>
          <p>name: {detail.name}</p>
          <p>description: {detail.description}</p>
          <p>manufacturer: {detail.manufacturer}</p>
          <p>origin: {detail.origin}</p>
          <p>price: {detail.price}</p>
          <p>discount: {detail.discount}</p>
          <p>stock: {detail.stock} pzs</p>
          {/* <p>category: {detail.category} </p> */}
        </div>
      </div>
    </div>
  );
}