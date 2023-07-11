import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRating } from '../redux/actions';

const AddingRating = (props) => {
  const [value, setValue] = useState(0);
  const userId = useSelector(state => state.userId)
  const productId = props.productId;
  const dispatch = useDispatch();

  console.log(userId);
  console.log(productId);

  const handleRatingChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleRatingSubmit = () => {
    dispatch(addRating( userId, productId, value));
  };

  return (
    <div>
      <h3>Calificar producto</h3>
      <select value={value} onChange={handleRatingChange}>
        <option value={0}>Selecciona una calificación</option>
        <option value={1}>1 estrella</option>
        <option value={2}>2 estrellas</option>
        <option value={3}>3 estrellas</option>
        <option value={4}>4 estrellas</option>
        <option value={5}>5 estrellas</option>
      </select>
      <button onClick={handleRatingSubmit}>Enviar calificación</button>
    </div>
  );
};

export default AddingRating;
