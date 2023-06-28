import{
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_CATEGORIES,
  SORT_PRODUCTS,
  FILTER_PRODUCTS_BY_PRICE,
  PAGE,
  CLEAN,
  
} from './actions'

const initialState = {
  page: 1,
  products: [],
  filteredProducts: [],
  sortOrder: '', 
  detail: [],
  categories: [],
};

const rootReducer= (state=initialState,action)=>{
switch(action.type){

  case GET_PRODUCTS:
    return {
      ...state,
      products: [...state.products, ...action.payload],
      filteredProducts: [...state.products, ...action.payload]
    };

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
