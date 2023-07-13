import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRatings } from '@/redux/actions';

// Selector para filtrar las calificaciones por ID de producto
export const getFilteredRatings = (state, productId) => {
  const { ratings } = state;
  return ratings.filter((product) => product.productId === productId);
};

const Rating = (productId) => {
  const ratings = useSelector((state) => getFilteredRatings(state, productId.objProduct));
  const dispatch = useDispatch();


  // Función para generar las estrellas
  const renderStars = (value) => {
    const filledStars = '★'.repeat(value); // Estrellas rellenas
    const emptyStars = '☆'.repeat(5 - value); // Estrellas vacías

    return filledStars + emptyStars;
  };

  if (ratings.length === 0) {
    return <p></p>;
  }

  return (
    <div>
      {ratings.map((product) => (
        <div key={product.productId}>
          {product.ratings.map((rating) => (
            <div key={rating.userId}>
              <p>
                Rating: {renderStars(rating.value)}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Rating;