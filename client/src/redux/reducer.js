import{
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  GET_CATEGORIES,
  SORT_PRODUCTS,
  FILTER_PRODUCTS_BY_PRICE,
  ADD_PRODUCT_TO_CART,
  GET_CART_BY_ID_USER,
  TOTAL_PRODUCTS,
  PAGE,
  CLEAN,
  
} from './actions'

const initialState = {
  productsbyName:[],
  page: 1,
  products: [],
  filteredProducts: [],
  sortOrder: '', 
  detail: [],
  categories: [],
  cart:[],
  totalProducts:0,
  cartUser:[]

};

const rootReducer= (state=initialState,action)=>{
switch(action.type){
  case GET_CART_BY_ID_USER:
    return { ...state, cartUser: action.payload };
  case TOTAL_PRODUCTS:
    
    return { ...state, totalProducts: state.totalProducts+1 };
  case ADD_PRODUCT_TO_CART:
    return { ...state, cart: action.payload };
//   const existingProduct = state.cart.find(item => item.productId === action.payload);
// console.log(state.cart)
//   if (existingProduct) {
  
//     existingProduct.quantity++;
//     return {
//       ...state,
//       cart: [...state.cart]
//     };
//   } else {
//     // Si el producto no existe 
//     const newProduct = {
//       productId: action.payload,
//       quantity: 1
//     };

//     return {
//       ...state,
//       cart: [...state.cart, newProduct]
//     };
//   }




  case GET_PRODUCTS:
    return {
      ...state,
      products: [...state.products, ...action.payload],
      filteredProducts: [...state.products, ...action.payload]
    };
    case GET_PRODUCT_BY_NAME:
      console.log(action.payload)
        return { ...state, productsbyName: action.payload };

    case FILTER_PRODUCTS_BY_PRICE:
      const { minPrice, maxPrice } = action.payload;
      const filteredProducts = state.products.filter(
        (product) =>
          parseFloat(product.price) >= parseFloat(minPrice) &&
          parseFloat(product.price) <= parseFloat(maxPrice)
      );
      return {
        ...state,
        filteredProducts: filteredProducts,
      };

      case SORT_PRODUCTS:
        return {
          ...state,
          filteredProducts: action.payload,
          sortOrder: action.payload.length > 0 ? state.sortOrder : '', // Restablece el sortOrder si no hay productos filtrados
        };


    case GET_PRODUCT_BY_ID:
      
        if(action.payload==='not found')
        return {...state}
        return { ...state, detail: action.payload };
  
    
    case GET_CATEGORIES:
        return { ...state, categories: action.payload };
     
      
    case CLEAN:
        return{
            ...state,
            detail:[]
          }
    case PAGE:
      
      return{
          ...state,page: action.payload
      }
  default: return {...state}
}

}
export default rootReducer;
