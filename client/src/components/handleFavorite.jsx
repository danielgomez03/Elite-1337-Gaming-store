import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/actions';

const handleFavorite = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const error = useSelector((state) => state.error);

  const handleAddFavorite = () => {
    const userId = 'ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a';
    const productId = '263f0f02-99f4-4811-b886-f2c36c2cfc26';
    dispatch(addFavorite(userId, productId));
  };

  const handleDeleteFavorite = () => {
    const userId = 'ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a';
    const productId = '263f0f02-99f4-4811-b886-f2c36c2cfc26';
    dispatch(deleteFavorite(userId, productId));
  };

  return (
    <div>
      <h1>handleFavorite</h1>
      <button onClick={handleAddFavorite}>Agregar Favorito</button>
      <button onClick={handleDeleteFavorite}>Eliminar Favorito</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default handleFavorite;