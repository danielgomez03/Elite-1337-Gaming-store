import{
    
  } from './actions'

const initialState = {
    products:[
        {
            productId: '81f78a64-454c-4ad9-8ff1-92a60745d16f',
            name: 'Product 15',
            description: 'This is product 15',
            manufacturer: 'Manufacturer A',
            origin: 'USA',
            price: 199.99,
            discount: 15,
            stock: 10,
            isActive: true,}]
}

const rootReducer= (state=initialState,action)=>{
 switch(action.type){
   
    default: return {...state}
 }

}
export default rootReducer;