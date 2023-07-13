import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavoritesByUser } from '../redux/actions';
import Card from './card';

const FavoritesByUserId = () => {
  const favorites = useSelector(state => state.favorites);
  const userId = useSelector(state => state.userId);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    // Llamar a la acción para obtener los productos favoritos por usuario
    dispatch(getFavoritesByUser(userId)); // Reemplaza 'userId' por el ID de usuario correspondiente
  }, [dispatch]);



  return (
    <div >
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="px-auto grid lg:grid-cols-5 md:grid-cols-2 xs:grid-cols-1 gap-3 p-4 ">
          {favorites?.map((favorite) => {
            const product = products.find((p) => p.productId === favorite.productId);
  
            if (product) {
              return (
                <div key={favorite.productId}>
                  <Card
                    id={product.productId}
                    name={product.name}
                    description={product.description}
                    manufacture={product.manufacturer}
                    origin={product.origin}
                    price={product.price}
                    discount={product.discount}
                    stock={product.stock}
                    categoryId={product.categoryId}
                    image={product.images[0].url}
                    objProduct={favorite.productId}
                  />
                </div>
              );
            } else {
              return null; // O maneja el caso en que el producto no se encuentre
            }
          })}
        </ul>
      )}
    </div>
  );
};

export default FavoritesByUserId;