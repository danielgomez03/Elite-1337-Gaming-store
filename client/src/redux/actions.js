import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_NAME";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ORDERS = "ORDERS";
export const FILTERS = "FILTERS";
export const PAGE = "PAGE";
export const CLEAN = "CLEAN";




export const getProducts = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/products");
    const products = response.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
    dispatch({ type: SET_FILTERED_PRODUCTS, payload: products }); 
  };
};


export const geProductById = (id) => {
    return async function (dispatch) {
      const bd = await axios.get(`http://localhost:3001/product/${id}`);
      const detail = bd.data
      dispatch({ type: GET_PRODUCT_BY_ID, payload:detail }); 
    };
  };
  
 
  
  export const getCategories = () => {
    return async function (dispatch) {
      const bd = await axios.get("http://localhost:3001/categories");
      const categories = bd.data
      dispatch({ type: GET_CATEGORIES, payload: categories });
    };
  };

  export const filterProductsByPrice = (minPrice, maxPrice) => {
    return function (dispatch, getState) {
      const { products } = getState();
      const filteredProducts = products.products.filter(product => product.price >= minPrice && product.price <= maxPrice);
      dispatch({ type: FILTER_PRODUCTS_BY_PRICE, payload: filteredProducts });
    };
  };

  export const changeSortOrder = (order) => {
    return function (dispatch, getState) {
      const { products } = getState();
      let sortedProducts = [...products.filteredProducts]; 
      if (order === 'ascending') {
        sortedProducts.sort((a, b) => a.price - b.price); 
      } else if (order === 'descending') {
        sortedProducts.sort((a, b) => b.price - a.price); 
      }
      dispatch({ type: CHANGE_SORT_ORDER, payload: sortedProducts });
    };
  };
  
  

  export const order = (order) =>{
    return function(dispatch){
      return dispatch({type: ORDERS , payload:order})
      
    }
  }
  export const filter = (filter) =>{
    console.log(filter)
    return function  (dispatch){
      return dispatch({type: FILTERS,payload:filter})
    }
  }
  
      
    
  
  export const page = (page) =>{
    console.log(page)
    return function  (dispatch){
      return dispatch({type: PAGE,payload:page})
    }
    
  }
 
  export function clean(){
    
    return{
     type: CLEAN
    }
  
  };



      
    
  
 
  
