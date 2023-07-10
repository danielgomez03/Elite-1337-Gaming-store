import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/actions';

const handleFavorite = ({ isFav, setIsFav }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const favorites = useSelector((state) => state.favorites);
  const error = useSelector((state) => state.error);

  const handleAddFavorite = () => {
    const productId = '263f0f02-99f4-4811-b886-f2c36c2cfc26';
    dispatch(addFavorite(userId, productId));
    setIsFav(true); // Actualiza el estado a verdadero (favorito agregado)
  };

  const handleDeleteFavorite = () => {
    const productId = '263f0f02-99f4-4811-b886-f2c36c2cfc26';
    dispatch(deleteFavorite(userId, productId));
    setIsFav(false); // Actualiza el estado a falso (favorito eliminado)
  };

  return (
    <div>
      {isFav ? (
        <button onClick={handleDeleteFavorite}>❤️</button>
      ) : (
        <button onClick={handleAddFavorite}>🤍</button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default handleFavorite;