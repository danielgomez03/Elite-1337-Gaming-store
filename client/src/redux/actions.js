import axios from "axios";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CART_BY_ID_USER = "GET_CART_BY_ID_USER";
export const PAGE = "PAGE";
export const CLEAN = "CLEAN";
export const TOTAL_PRODUCTS= "TOTAL_PRODUCTS";
export const MODIFY_QUANTITY = "MODIFY_QUANTITY";
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ACTION_BYNAME = "ACTION_BYNAME"
//---------Sort types----/
export const SORT_PRODUCTS = "SORT_PRODUCTS";
//---------Filters types----/
export const FILTER_PRODUCTS_BY_PRICE = "FILTER_PRODUCTS_BY_PRICE";
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";
//---------Rating types----/
export const GET_RATINGS ="GET_RATINGS";
export const GET_RATINGS_ERROR ="GET_RATINGS_ERROR";

export const GET_COMMENTS_BY_PRODUCT = "GET_COMMENTS_BY_PRODUCT";

export const ADD_RATING = 'ADD_RATING';
//---------Favorites types----/
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const ADD_FAVORITE_ERROR = 'ADD_FAVORITE_ERROR';
//---------other types----/




// -----------actions cart----------------------------------------------------------------------------------------
export const deleteProduct = (product) =>{
  console.log(product)
  return async function (dispatch) {
    const response = await axios.delete("http://localhost:3001/carts/remove", {data:product});
    const cart = response.data;
    console.log(cart)
    dispatch({ type: DELETE_PRODUCT, payload: cart });
  };
}

export const modifyQuantity = (product) =>{
 console.log(product)
  return async function (dispatch) {
    const response = await axios.patch("http://localhost:3001/carts/edit", product);
    const cart = response.data;
    console.log(cart)
    dispatch({ type: MODIFY_QUANTITY, payload: cart });
  };
}
export const getCartByIdUser = (id) =>{
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/carts/user/${id}`);
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
   
    const response = await axios.post("http://localhost:3001/carts/add",product);
    
    const cart = response.data
    console.log(cart
      )
      dispatch({type: ADD_PRODUCT_TO_CART ,payload:cart})
    };
  }
//---------------------------------------------------------------------//
//Get Products actions---------------------------------//

export const getCommentsByProduc = (id) =>{
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/comments/product/${id}`);
    const comments = response.data;
    dispatch({ type: GET_COMMENTS_BY_PRODUCT, payload: comments });
  };
}

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

//---------------------------------------------------------------------//
//Categories filters actions---------------------------------//

  export const getCategories = () => {
    return async function (dispatch) {
      const bd = await axios.get("http://localhost:3001/categories");
      const categories = bd.data
      dispatch({ type: GET_CATEGORIES, payload: categories });
    };
  };

  export const filterProductsByCategory = (category) => {
    return function (dispatch) {
      dispatch({ type: FILTER_PRODUCTS_BY_CATEGORY, payload: { category } });
    };
  };

//---------------------------------------------------------------------//
//Price Filters actions---------------------------------//
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


//---------------------------------------------------------------------//
//Ordenamientos actions---------------------------------//

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


//---------------------------------------------------------------------//
//Ratings actions---------------------------------//

  export const getRatings = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/ratings/products');
        const data = response.data.products;
        dispatch({ type: 'GET_RATINGS', payload: data });
      } catch (error) {
        dispatch({ type: 'GET_RATINGS_ERROR', payload: error });
      }
    };
  };


  export const addRating = (ratingData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3001/ratings/add', ratingData);
        const newRating = response.data;
        
        dispatch({
          type: ADD_RATING,
          payload: newRating,
        });
      } catch (error) {
        console.log('Error al agregar el rating:', error);
      }
    };
  };

//---------------------------------------------------------------------//
//Favorites actions---------------------------------//
export const addFavorite = (userId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/favorites/add', {
        userId,
        productId
      });

      if (response.status === 200) {
        const favorite = response.data;

        if (favorite.message) {
          // Si la respuesta contiene un mensaje, significa que el producto ya está en favoritos
          dispatch({
            type: ADD_FAVORITE_ERROR,
            error: favorite.message
          });
        } else {
          // Si no hay mensaje, el favorito se agregó correctamente
          dispatch({
            type: ADD_FAVORITE,
            favorite
          });
        }
      } else {
        dispatch({
          type: ADD_FAVORITE_ERROR,
          error: 'Error al agregar el favorito'
        });
      }
    } catch (error) {
      dispatch({
        type: ADD_FAVORITE_ERROR,
        error: 'Error de conexión'
      });
    }
  };
};

//---------------------------------------------------------------------//
//Other actions---------------------------------//
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
  



      
    
  
 
  
