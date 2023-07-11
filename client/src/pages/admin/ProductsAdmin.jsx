import { editProduct, getProducts, changeProductStatus } from '@/redux/actions';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateProduct from "../../components/CreateProduct"


function ProductsAdmin() {
  const dispatch = useDispatch();
  const products = useSelector(state=>state.products)
  console.log(products)
  useEffect(()=>{
 dispatch(getProducts())

  },[])

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
 
  
  return (
    <div>
    <div>
      {selectedButton && (
        <CreateProduct 
          onClose={closeCreateProduct}
        />
      )}
      <button onClick={ openCreateProduct }>...Add Product</button>
    </div>
    
    
    <div 
    className="product-list">


  <table 
    className="table">
    <thead>
      <tr className="table-header">
        <th className="table-cell"></th>
        <th className="table-cell">Product</th>
        <th className="table-cell">Stock</th>
        <th className="table-cell">Price</th>
        <th className="table-cell">Discount % off</th>
        <th className="table-cell">Active</th>
        <th className="table-cell">Description</th>
      </tr>
    </thead>
    <tbody>
  {products.map((item) => {
    
   
    return (
      <tr key={item.productId} className="table-row">
        <td className="table-cell">
          <img src={item.images[0].url} alt="Image" className="image" />
        </td>
        <td className="table-cell">{item.name}</td>
        <td className="table-cell">
          <input
            type="number"
            min="0"
            name="stock"
            value={item.stock}
            className="input-stock"
            onChange={(e) => {
              dispatch(editProduct(item.productId, "stock", e.target.value)).then(() => {
                dispatch(getProducts());
              });
            }}
          />
        </td>
        <td className="table-cell">
          ${item.price}
          <div className="input-container">
            <input
              className="moto-input"
              type="text"
              name="price"
              value={updatedPrice[item.productId] || ''}
              onChange={(e) => {
                const value = e.target.value;
                const sanitizedValue = value.replace(/[^0-9.]/g, '').slice(0, 12);
                handlePriceChange(item.productId, sanitizedValue)
                
                
              }}
              onKeyDown={(e) => {
                // Permitir solo números y tecla de punto decimal
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
              className="update-button"
              onClick={() => {
                dispatch(editProduct(item.productId, "price", updatedPrice[item.productId])).then(() => {
                  dispatch(getProducts());
                  setUpdatedPrice('');
                });
              }}
            >
              Update
            </button>
          </div>
        </td>
        <td className="table-cell">
        <input
            type="number"
            min="0"
            max="99"
            name="discount"
            value={item.discount}
          
            onChange={(e) => {
              dispatch(editProduct(item.productId, "discount", e.target.value)).then(() => {
                dispatch(getProducts());
              });
            }}
          />
        </td>
        <td className="table-cell">
        <button
  className={`switch-button ${item.isActive ? 'active' : ''}`}
  onClick={() => {
    dispatch(changeProductStatus(item.productId)).then(() => {
      dispatch(getProducts());
    });
  }}
>
  {item.isActive ? 'on' : 'off'}
</button>
        </td>
        <td className="table-cell">
  <div className="description-container">
    <span>{item.description}</span>
    {!showDescriptionInput && (
      <button
        className="update-button"
        onClick={() => setShowDescriptionInput(true)}
      >
        edit
      </button>
    )}
  </div>
  {showDescriptionInput && (
    <div>
      <input
        className="moto-input"
        type="textarea"
        name="description"
        value={description[item.productId] || ''}
        onChange={(e) => handleDescriptionChange(item.productId, e.target.value)}
      />
      <button
        className="update-button"
        onClick={() => {
          console.log(description[item.productId]);
          dispatch(editProduct(item.productId, "description", description[item.productId])).then(() => {
            dispatch(getProducts());
            setDescription([]);
            setShowDescriptionInput(false);
          });
        }}
      >
        update
      </button>
    </div>
  )}
</td>
      </tr>
    );
  })}
</tbody>
  </table>
  <style>{`
        
        .product-list {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
          margin-top: 2rem;
        }
        .table {
          border-collapse: collapse;
          width: 100%;
        }
        .table-header {
          font-weight: bold;
          border-bottom: 1px solid #ccc;
        }
        .table-row {
          border-bottom: 1px solid #ccc;
        }
        .table-cell {
          padding: 0.5rem;
        }
        .image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .input-stock,
        .input-container {
          display: flex;
          align-items: center;
        }
        .input-container {
          gap: 10px;
        }
        .moto-input {
          margin: 10px;
          border: 1px solid #ccc;
        }
        .description-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .update-button {
          padding: 0.5rem;
          background-color: #969696;
          color: #333;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .update-button:hover {
          color: #969696;
          background-color: #00315E;
        }
        .switch-button {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
          background-color: #ccc;
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
        }
        .switch-button::before {
          
          position: absolute;
          top: 2px;
          left: 2px;
          width: 26px;
          height: 26px;
          background-color: #fff;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
        .switch-button.active {
          background-color: #FF5F00;
        }
        .switch-button.active::before {
          transform: translateX(30px);
        }
      `}</style>
</div>
</div>
  )
}

export default ProductsAdmin