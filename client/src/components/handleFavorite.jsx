import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/actions';

const HandleFavorite = ({ isFav, setIsFav, id }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const favorites = useSelector((state) => state.favorites);
  const error = useSelector((state) => state.error);

  const handleAddFavorite = () => {
    const productId = id;
    dispatch(addFavorite(userId, productId))
      .then(() => setIsFav(true)) // Actualiza el estado a verdadero (favorito agregado)
      .catch((error) => console.error(error));
  };

  const handleDeleteFavorite = () => {
    const productId = id;
    dispatch(deleteFavorite(userId, productId))
      .then(() => setIsFav(false)) // Actualiza el estado a falso (favorito eliminado)
      .catch((error) => console.error(error));
  };

  return (
    <div className='absolute bottom-48 right-4 text-lg'>
      {isFav ? (
        <button onClick={handleDeleteFavorite}>❤️</button>
      ) : (
        <button onClick={handleAddFavorite}>🤍</button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default HandleFavorite;