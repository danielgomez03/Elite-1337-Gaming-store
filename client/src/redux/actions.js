import axios from "axios";



export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const ORDERS = "ORDERS";
export const FILTERS = "FILTERS";
export const PAGE = "PAGE";
export const CLEAN = "CLEAN";




export const getProducts = () => {
  return async function (dispatch) {
    const bd = await axios.get("http://localhost:3001/products");
    const products = bd.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
  };
};


export const getProductById = (id) => {
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
      console.log(categories)
      dispatch({ type: GET_CATEGORIES, payload: categories });
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



      
    
  
 
  
