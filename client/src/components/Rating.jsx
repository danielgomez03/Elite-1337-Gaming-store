import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRatings } from '@/redux/actions';

const Rating = (productId) => {
  const ratings = useSelector((state) => state.ratings);
  const productsfilter = ratings.filter((product) => product.productId === productId.objProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRatings());
  }, [dispatch]);

  // Función para generar las estrellas
  const renderStars = (value) => {
    const filledStars = '★'.repeat(value); // Estrellas rellenas
    const emptyStars = '☆'.repeat(5 - value); // Estrellas vacías

    return filledStars + emptyStars;
  };

  return (
    <div>
      {productsfilter.map((product) => (
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