import axios from "axios";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const FILTER_PRODUCTS_BY_PRICE = "FILTER_PRODUCTS_BY_PRICE";
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";
export const SORT_PRODUCTS = "SORT_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CART_BY_ID_USER = "GET_CART_BY_ID_USER";
export const PAGE = "PAGE";
export const CLEAN = "CLEAN";
export const TOTAL_PRODUCTS= "TOTAL_PRODUCTS";
export const MODIFY_QUANTITY = "MODIFY_QUANTITY";
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ACTION_BYNAME = "ACTION_BYNAME"

// -----------actions cart----------------------------------------------------------------------------------------
export const deleteProduct = (product) =>{
  console.log(product)
  return async function (dispatch) {
    const response = await axios.delete("https://ft37bpfgrupo12-production.up.railway.app/carts/remove", {data:product});
    const cart = response.data;
    console.log(cart)
    dispatch({ type: DELETE_PRODUCT, payload: cart });
  };
}

export const modifyQuantity = (product) =>{
 console.log(product)
  return async function (dispatch) {
    const response = await axios.patch("https://ft37bpfgrupo12-production.up.railway.app/carts/edit", product);
    const cart = response.data;
    console.log(cart)
    dispatch({ type: MODIFY_QUANTITY, payload: cart });
  };
}
export const getCartByIdUser = (id) =>{
  return async function (dispatch) {
    const response = await axios.get(`https://ft37bpfgrupo12-production.up.railway.app/carts/user/${id}`);
    const cart = response.data;
    dispatch({ type: GET_CART_BY_ID_USER, payload: cart });
  };
}
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
   
    const response = await axios.post("https://ft37bpfgrupo12-production.up.railway.app/carts/add",product);
    
    const cart = response.data
    console.log(cart
      )
      dispatch({type: ADD_PRODUCT_TO_CART ,payload:cart})
    };
  }
  // ---------------------------------------------------------------------------------------------------------------

  export const getProducts = () => {
  return async function (dispatch) {
    const response = await axios.get("https://ft37bpfgrupo12-production.up.railway.app/products");
    const products = response.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
  };
};

export const getProductByName = (name) => {
  return async function (dispatch) {
    const bd = await axios.get(`https://ft37bpfgrupo12-production.up.railway.app/products?name=${name}`);
    const product = bd.data
    dispatch({ type: GET_PRODUCT_BY_NAME, payload:product }); 
  };
};

export const getProductById = (id) => {
    return async function (dispatch) {
      const bd = await axios.get(`https://ft37bpfgrupo12-production.up.railway.app/products/id/${id}`);
      const detail = bd.data
      dispatch({ type: GET_PRODUCT_BY_ID, payload:detail }); 
    };
  };


  export const getCategories = () => {
    return async function (dispatch) {
      const bd = await axios.get("https://ft37bpfgrupo12-production.up.railway.app/categories");
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


  export const filterProductsByCategory = (category) => {
    return function (dispatch) {
      dispatch({ type: FILTER_PRODUCTS_BY_CATEGORY, payload: { category } });
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
  export const actionByName = ()=> {
    return{
      type: ACTION_BYNAME
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
  



      
    
  
 
  
