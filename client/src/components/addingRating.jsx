import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRating } from '../redux/actions'; 

const addingRating = ({ userId, productId }) => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  const handleRatingChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleRatingSubmit = () => {
    const ratingData = {
      userId: "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a",
      productId: "7d23e873-6bb8-4569-acf5-ebeef606afd6",
      value: value,
    };
    dispatch(addRating(ratingData)); // Dispatch de la acción para agregar el rating
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

export default addingRating;