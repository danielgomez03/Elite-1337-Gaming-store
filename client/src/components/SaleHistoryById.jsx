import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSaleHistory } from '../redux/actions';
import Card from './card';

const SaleHistory = () => {
  const dispatch = useDispatch();
  const saleHistory = useSelector((state) => state.saleHistory.saleHistory);
  const userId = useSelector((state) => state.userId);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSaleHistory(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <h2>Sale History</h2>
      {Array.isArray(saleHistory) && saleHistory.length === 0 ? (
        <p>No Sale History</p>
      ) : (
        <ul className="px-auto grid lg:grid-cols-5 md:grid-cols-2 xs:grid-cols-1 gap-3 p-4">
          {Array.isArray(saleHistory) &&
            saleHistory.map((sale) => {
              const product = products.find((p) => p.productId === sale.productId);

              return (
                <div key={sale.saleHistoryId}>
                  <Card
                    id={product.productId}
                    name={product.name}
                    description={product.description}
                    manufacture={product.manufacturer}
                    origin={product.origin}
                    price={sale.priceAtSale}
                    discount={sale.discountAtSale}
                    stock={product.stock}
                    categoryId={product.categoryId}
                    image={product.images[0]?.url}
                    objProduct={product.productId}
                  />
                </div>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default SaleHistory;