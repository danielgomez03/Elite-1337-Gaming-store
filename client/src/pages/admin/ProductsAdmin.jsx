import { editProduct, getProducts, changeProductStatus } from '@/redux/actions';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateProduct from "../../components/CreateProduct"


function ProductsAdmin() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products)
  console.log(products)
  useEffect(() => {
    dispatch(getProducts())

  }, [])

  const [updatedPrice, setUpdatedPrice] = useState([]);
  const handlePriceChange = (index, value) => {
    setUpdatedPrice((prevPrice) => {
      const newPrice = [...prevPrice];
      newPrice[index] = value;
      return newPrice;
    });
  };
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState([]);

  const handleDescriptionChange = (index, value) => {
    setDescription((prevDescriptions) => {
      const newDescriptions = [...prevDescriptions];
      newDescriptions[index] = value;
      return newDescriptions;
    });
  };
  const [selectedButton, setSelectedButton] = useState(false);

  const openCreateProduct = () => {
    setSelectedButton(true);
  };

  const closeCreateProduct = () => {
    setSelectedButton(false);
  };

  const toggleDescriptionInput = () => {
    setShowDescriptionInput(!showDescriptionInput);
  };

  

  return (
    <div className="w-4/6 bg-white container mx-auto py-10 px-16 z-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={openCreateProduct}>Add Product</button>
      </div>
      { setSelectedButton && <CreateProduct closeCreateProduct={closeCreateProduct} /> }
      <div className="product-list">
        <table className="w-full border-collapse relative">
          <thead className='sticky'>
          {products.length === 0 && (
          // Esqueleto de carga para cuando no hay datos
          <tr className="table-row border-b gap-1">
            <td className="table-cell bg-gray-100 animate-pulse h-10 w-10"></td>
            <td className="table-cell bg-gray-100 animate-pulse h-4 w-1/6"></td>
            <td className="table-cell bg-gray-100 animate-pulse h-4 w-1/12"></td>
            <td className="table-cell bg-gray-100 animate-pulse h-4 w-1/5"></td>
            <td className="table-cell bg-gray-100 animate-pulse h-4 w-1/12"></td>
            <td className="table-cell bg-gray-100 animate-pulse h-4 w-1/12"></td>
            <td className="table-cell bg-gray-100 animate-pulse h-20 w-1/4"></td>
          </tr>
        )}
            <tr className="table-header">
              <th className="table-cell"></th>
              <th className="table-cell">Product</th>
              <th className="table-cell">Stock</th>
              <th className="table-cell">Price</th>
              <th className="table-cell">Discount % off</th>
              <th className="table-cell">Active</th>
              <th className="table-cell w-1/5">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.productId} className="table-row border-b">
                <td className="table-cell">
                  <img src={item.images[0].url} alt={item.name} className="w-10 h-10" />
                </td>
                <td className="table-cell w-1/6">{item.name}</td>
                <td className="table-cell text-center">
                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={item.stock}
                    className="w-16 px-2 py-1 rounded border "
                    onChange={(e) => {
                      dispatch(editProduct(item.productId, 'stock', e.target.value)).then(() => {
                        dispatch(getProducts());
                      });
                    }}
                  />
                </td>
                <td className="table-cell text-center flex flex-row w-1/5 mt-2 mr-4">
                  ${item.price}
                  <div className="items-center my-2">
                    <input
                      className="w-24 px-2 py-1 mr-2 rounded border "
                      type="text"
                      name="price"
                      value={updatedPrice[item.productId] || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        const sanitizedValue = value.replace(/[^0-9.]/g, '').slice(0, 12);
                        handlePriceChange(item.productId, sanitizedValue);
                      }}
                      onKeyDown={(e) => {
                        if (
                          !/^\d*\.?\d*$/.test(e.key) &&
                          e.key !== 'Backspace' &&
                          e.key !== 'Delete' &&
                          e.key !== 'ArrowLeft' &&
                          e.key !== 'ArrowRight' &&
                          e.key !== 'Home' &&
                          e.key !== 'End'
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <button
                      className="px-3 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-600 hover:text-white"
                      onClick={() => {
                        dispatch(editProduct(item.productId, 'price', updatedPrice[item.productId])).then(() => {
                          dispatch(getProducts());
                          setUpdatedPrice('');
                        });
                      }}
                    >
                      Update
                    </button>
                  </div>
                </td>
                <td className="table-cell text-center w-1/12 px-2">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    name="discount"
                    value={item.discount}
                    className="w-16 ml-4 px-2 py-1 rounded border "
                    onChange={(e) => {
                      dispatch(editProduct(item.productId, 'discount', e.target.value)).then(() => {
                        dispatch(getProducts());
                      });
                    }}
                  />
                </td>
                <td className="table-cell text-center px-2">
                  <button
                    className={`rounded p-1.5 switch-button ${item.isActive ? 'bg-gray-100 hover:bg-gray-200 text-indigo-800 font-semibold' : 'bg-orange-500 hover:bg-orange-600 text-white '}`}
                    onClick={() => {
                      dispatch(changeProductStatus(item.productId)).then(() => {
                        dispatch(getProducts());
                      });
                    }}
                  >
                    {item.isActive ? 'on' : 'off'}
                  </button>

                </td>
                <td className="table-cell w-1/4 flex ">
                  <textarea
                    className={`w-[75%] h-20 px-auto py-1 mb-2 border rounded ${showDescriptionInput ? '' : 'border-transparent'}`}
                    name="description"
                    value={description[item.productId] || item.description}
                    readOnly={!showDescriptionInput}
                    onChange={(e) => handleDescriptionChange(item.productId, e.target.value)}
                  />
                  {!showDescriptionInput && (
                    <button
                      className="w-[25%] px-auto py-1 text-blue-500 underline"
                      onClick={() => toggleDescriptionInput()}
                    >
                      Edit
                    </button>
                  )}
                  {showDescriptionInput && (
                    <div className="w-1/4 p-2">
                      <button
                        className="px-4 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        onClick={() => {
                          dispatch(editProduct(item.productId, 'description', description[item.productId])).then(() => {
                            dispatch(getProducts());
                            setDescription([]);
                            toggleDescriptionInput();
                          });
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="px-4 py-1 text-gray-500 underline"
                        onClick={() => toggleDescriptionInput()}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsAdmin