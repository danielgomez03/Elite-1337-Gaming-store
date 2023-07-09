import { fetchUsers, getProducts, modifyIsActiveUser } from '@/redux/actions';
import React, { useEffect , useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ProductsAdmin() {
  const dispatch = useDispatch();
  const products = useSelector(state=>state.products)
  console.log(products)
  useEffect(()=>{
 dispatch(getProducts())

  },[])

 
  return (
    
    <div className="product-list">
  <style>
    {`
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
    `}
  </style>

  <table className="table">
    <thead>
      <tr className="table-header">
        <th className="table-cell"></th>
        <th className="table-cell">Product</th>
        <th className="table-cell">Stock</th>
        <th className="table-cell">Price</th>
        <th className="table-cell">Discount</th>
        <th className="table-cell">Active</th>
        <th className="table-cell">Description</th>
      </tr>
    </thead>
    <tbody>
      {products.map((item) => (
        <tr key={item.productId} className="table-row">
          <td className="table-cell">
            <img src={item.images[0].url} alt="Image" className="image" />
          </td>
          <td className="table-cell">{item.name}</td>
          <td className="table-cell">{item.stock}</td>
          <td className="table-cell">{item.price}</td>
          <td className="table-cell">{item.discount}</td>
          <td className="table-cell">{item.active ? 'Active' : 'Inactive'}</td>
          <td className="table-cell">{item.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}

export default ProductsAdmin