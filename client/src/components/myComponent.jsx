import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../redux/actions';

const MyComponent = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    // Aquí puedes realizar otras acciones o efectos secundarios al cargar el componente
  }, []);

  const handleAddFavorite = () => {
    const userId = 'ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a';
    const productId = '263f0f02-99f4-4811-b886-f2c36c2cfc26';
    dispatch(addFavorite(userId, productId));
  };

  return (
    <div>
      <h1>My Component</h1>
      <button onClick={handleAddFavorite}>Agregar Favorito</button>
      {error && <p>Error: {error}</p>}
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;