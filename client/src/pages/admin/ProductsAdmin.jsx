import React from 'react'
import CreateProduct from "./createProduct"
import Link from 'next/link'

function ProductsAdmin() {
  return (
    <div>      
      <Link href="/admin/products/create">Create Product</Link>
    </div>
  )
}

export default ProductsAdmin