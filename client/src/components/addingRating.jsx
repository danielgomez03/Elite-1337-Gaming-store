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
<div className="p-4">
  <h3 className="text-lg font-bold mb-4">Calificar producto</h3>
  <div className="relative">
    <select
      value={value}
      onChange={handleRatingChange}
      className="hidden"
    >
      <option value={0}>Selecciona una calificación</option>
      <option value={1}>1 estrella</option>
      <option value={2}>2 estrellas</option>
      <option value={3}>3 estrellas</option>
      <option value={4}>4 estrellas</option>
      <option value={5}>5 estrellas</option>
    </select>
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          htmlFor={`star-${star}`}
          className="cursor-pointer"
        >
          <svg
            className={`w-6 h-6 fill-current ${
              star <= value ? 'text-yellow-500' : 'text-gray-400'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.31 6.91 1l-5 4.86 1.18 6.88-6.18-3.24-6.18 3.24 1.18-6.88-5-4.86 6.91-1z" />
          </svg>
          <input
            type="radio"
            id={`star-${star}`}
            name="rating"
            value={star}
            className="sr-only"
            checked={star === value}
            onChange={handleRatingChange}
          />
        </label>
      ))}
    </div>
  </div>
  <button
    onClick={handleRatingSubmit}
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
  >
    Enviar calificación
  </button>
</div>
  );
};

export default AddingRating;
