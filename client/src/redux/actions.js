import axios from "axios";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const FILTER_PRODUCTS_BY_PRICE = "FILTER_PRODUCTS_BY_PRICE";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const PAGE = "PAGE";
export const CLEAN = "CLEAN";
export const TOTAL_PRODUCTS= "TOTAL_PRODUCTS"
export const CREATE_PAY = "CREATE_PAY";

// -----------actions cart----------------------------------------------------------------------------------------
export const countCart =()=>{
  
  return function  (dispatch){
  return dispatch({type: TOTAL_PRODUCTS });   
  }
}
export const addProductToCart = (id) => {
  const product={
    userId: "ac5b18b6-6383-4a9f-8e4c-65ad3c93b81a",
    productId: id,
    quantity: 1
  }
  
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/carts/add",product);
    
    const cart = response.data
    console.log(cart
      )
      dispatch({type: ADD_PRODUCT_TO_CART ,payload:cart})
    };
  }
  // ---------------------------------------------------------------------------------------------------------------
export const getProducts = () => {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/products");
    const products = response.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    const bd = await axios.get(`http://localhost:3001/products?name=${name}`);
    const product = bd.data
    dispatch({ type: GET_PRODUCT_BY_NAME, payload:product }); 
  };
};

export const getProductById = (id) => {
    return async function (dispatch) {
      const bd = await axios.get(`http://localhost:3001/products/id/${id}`);
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
      const priceFilteredProducts = products.filter(
        (product) =>
          parseFloat(product.price) >= parseFloat(minPrice) &&
          parseFloat(product.price) <= parseFloat(maxPrice)
      );
      dispatch({
        type: FILTER_PRODUCTS_BY_PRICE,
        payload: { minPrice, maxPrice, filteredProducts: priceFilteredProducts },
      });
    };
  };


  export const sortProducts = (order) => {
    return function (dispatch, getState) {
      const { filteredProducts } = getState();
      let sortedProducts = [...filteredProducts];
      if (order === 'ascending') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (order === 'descending') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      dispatch({ type: SORT_PRODUCTS, payload: sortedProducts });
    };
  };
  
    
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

  export const createPaymentIntent = (paymentData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`http://localhost:3001/stripe/process-payment`, paymentData);
        const createdPay = response.data;
  
        dispatch({
          type: CREATE_PAY,
          payload: createdPay,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };