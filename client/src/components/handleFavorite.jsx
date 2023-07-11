import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/actions';

const handleFavorite = ({ isFav, setIsFav }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.userId);
  const favorites = useSelector((state) => state.favorites);
  const error = useSelector((state) => state.error);

  const handleAddFavorite = () => {
    const productId = props.id;
    dispatch(addFavorite(userId, productId))
      .then(() => setIsFav(true)) // Actualiza el estado a verdadero (favorito agregado)
      .catch((error) => console.error(error));
  };

  const handleDeleteFavorite = () => {
    const productId = props.id;
    dispatch(deleteFavorite(userId, productId))
      .then(() => setIsFav(false)) // Actualiza el estado a falso (favorito eliminado)
      .catch((error) => console.error(error));
  };

  return (
    <div>
<div className="absolute top-60 right-5">
  {isFav ? (
    <button onClick={handleDeleteFavorite}>❤️</button>
  ) : (
    <button onClick={handleAddFavorite}>🤍</button>
  )}
  {error && <p>Error: {error}</p>}
</div>
    </div>
  );
};

export default handleFavorite;