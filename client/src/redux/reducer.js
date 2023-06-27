import{
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_CATEGORIES,
  ORDERS,
  FILTERS,
  PAGE,
  CLEAN,
  
} from './actions'

const initialState = {
  page: 1,
  products: [],
  detail: [],
  filters: [],
  categories: [],
  filteredProducts: [], 
  sortOrder: 'ascending'
};

const rootReducer= (state=initialState,action)=>{
switch(action.type){
  case GET_PRODUCTS:
      return {...state,products:action.payload}
    case GET_PRODUCT_BY_ID:
      
        if(action.payload==='not found')
        return {...state}
        return { ...state, detail: action.payload };
  
    
    case GET_CATEGORIES:
        return { ...state, categories: action.payload };
   
    
    case ORDERS:
     
      return {...state}
    case FILTERS:
      
  return{...state} 
  
  
      
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