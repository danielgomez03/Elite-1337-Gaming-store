import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesByUser } from '../redux/actions';

const FavoritesByUserId = () => {
  const favorites = useSelector(state => state.favorites);
  const error = useSelector(state => state.error);
  const userId = 'ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a'
  const dispatch = useDispatch();

  useEffect(() => {
    // Llamar a la acción para obtener los productos favoritos por usuario
    dispatch(getFavoritesByUser(userId)); // Reemplaza 'userId' por el ID de usuario correspondiente
  }, [dispatch]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li>{favorite.productId}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesByUserId;