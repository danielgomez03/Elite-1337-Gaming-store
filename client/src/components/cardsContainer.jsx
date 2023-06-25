import React from 'react'
import Card from './card'







export default function CardsContainer() {
  

  const products=[]
   
  return (
    <div>
      
      <div>
      {
        products.map(product=>{
            return (
              <div key={product.productId}>
              
                  <Card
                      id={product.productId}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                  />
            
          </div>
          
              )
            })
            
            
        }
        </div>
        </div>
  )
}