import axios from "axios";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART"
export const GET_PRODUCT_BY_NAME = "GET_PRODUCT_BY_NAME";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CART_BY_ID_USER = "GET_CART_BY_ID_USER";
export const PAGE = "PAGE";
export const CLEAN = "CLEAN";
export const TOTAL_PRODUCTS = "TOTAL_PRODUCTS";
export const MODIFY_QUANTITY = "MODIFY_QUANTITY";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const ACTION_BYNAME = "ACTION_BYNAME";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CHANGE_PRODUCT_STATUS = "CHANGE_PRODUCT_STATUS";
//---------User's types----/
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const FETCH_USER_BY_ID = 'FETCH_USER_BY_ID';
export const MODIFY_ISACTIVE_USER = "MODIFI_ISACTIVE_USER"
//---------Sort types----/
export const SORT_PRODUCTS = "SORT_PRODUCTS";
//---------Filters types----/
export const FILTER_PRODUCTS_BY_PRICE = "FILTER_PRODUCTS_BY_PRICE";
export const FILTER_PRODUCTS_BY_CATEGORY = "FILTER_PRODUCTS_BY_CATEGORY";
//---------Rating types----/
export const GET_RATINGS = "GET_RATINGS";
export const GET_RATINGS_ERROR = "GET_RATINGS_ERROR";
export const ADD_RATING = 'ADD_RATING';
//---------Comments types----/
export const GET_COMMENTS_BY_PRODUCT = "GET_COMMENTS_BY_PRODUCT";
//---------Favorites types----/
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const ADD_FAVORITE_ERROR = 'ADD_FAVORITE_ERROR';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const DELETE_FAVORITE_ERROR = 'DELETE_FAVORITE_ERROR';
export const GET_FAVORITES_SUCCESS = 'GET_FAVORITES_SUCCESS';
export const GET_FAVORITES_FAILURE = 'GET_FAVORITES_FAILURE';
//---------Session types----/
export const POST_LOGIN = "POST_LOGIN";
export const POST_LOGOUT = "POST_LOGOUT";
export const CONFIRM_SESSION = "CONFIRM_SESSION";
export const CHANGE_USER = "CHANGE_USER";
//---------other types----/





// -----------actions session----------------------------------------------------------------------------------------
export const confirmSession = (tokenRedux, userId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/login/tokens", {
        headers: {
          Authorization: `Bearer ${tokenRedux}`,
        },
      });

      const { data } = response;
      console.log("confirmSession", data);
      if (data && data.message === "Session persisted") {
        dispatch({ type: CONFIRM_SESSION, payload: { token: tokenRedux, userId } });
        console.log("Session confirmed");
      } else {
        console.log("Not session persisted");
      }
    } catch (error) {
      console.log("Error during session confirmation:", error);
    }
  };
};


export const postLogin = (tokenRedux, credentials, userId) => {
  return async function (dispatch) {
    try {
      if (tokenRedux === "" && userId === "") {
        const response = await axios.post("http://localhost:3001/login/signin", credentials);
        const token = response.data.generatedToken;
        const userId = response.data.userId;
        if (token && userId) {
          console.log("LoginAction", response.data.message);
          dispatch({ type: POST_LOGIN, payload: { token, userId } });
        } else {
          console.log("Login failed");
        }
      } else {
        console.log("Session already initialized");
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch({ type: POST_LOGIN, payload: { error } });
    }
  };
};

export const postLogout = (userId) => {
  return async function (dispatch) {
    try {
      const data = { userId: userId };
      const response = await axios.post("http://localhost:3001/login/signout", data);
      dispatch({ type: POST_LOGOUT, payload: "" });
    } catch (error) {
      console.error("Error during logout:", error);
      dispatch({ type: POST_LOGOUT, payload: "" });
    }
  };
};

export const changeUser = (typeUser) => {
  return function (dispatch) {
    return dispatch({ type: CHANGE_USER, payload: typeUser });
  }
};

// -----------actions cart----------------------------------------------------------------------------------------
export const deleteProduct = (product) => {
  console.log(product)
  return async function (dispatch) {
    const response = await axios.delete("http://localhost:3001/carts/remove", { data: product });
    const cart = response.data;
    console.log(cart)
    dispatch({ type: DELETE_PRODUCT, payload: cart });
  };
}

export const modifyQuantity = (product) => {
  console.log(product)
  return async function (dispatch) {
    const response = await axios.patch("http://localhost:3001/carts/edit", product);
    const cart = response.data;
    console.log(cart)
    dispatch({ type: MODIFY_QUANTITY, payload: cart });
  };
}
export const getCartByIdUser = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/carts/user/${id}`);
    const cart = response.data;
    dispatch({ type: GET_CART_BY_ID_USER, payload: cart });
  };
}
export const countCart = () => {

  return function (dispatch) {
    return dispatch({ type: TOTAL_PRODUCTS });
  }
}
export const addProductToCart = (userId,id) => {
  const product = {
    userId: userId,
    productId: id,
    quantity: 1
  }

  return async function (dispatch) {

    const response = await axios.post("http://localhost:3001/carts/add", product);

    const cart = response.data
    console.log(cart
    )
    dispatch({ type: ADD_PRODUCT_TO_CART, payload: cart })
  };
}

//---------------------------------------------------------------------//
//User's actions---------------------------------//
export const modifyIsActiveUser = (userId,status) =>{
  console.log(status,userId)
  if(status){
   return async function (dispatch) {
     await axios.patch("http://localhost:3001/admin/user/disable", {userId});
     dispatch({ type: MODIFY_ISACTIVE_USER });
   }
  }else{
   return async function (dispatch) {
    await axios.patch("http://localhost:3001/admin/user/enable", {userId});
    dispatch({ type: MODIFY_ISACTIVE_USER });
  }}
 }
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/users/');
    const users = response.data;
    dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
};

export const fetchUserById = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/id/${userId}`);
      dispatch({ type: FETCH_USER_BY_ID, payload: response.data });
    } catch (error) {
      console.error('Error in fetchUserById:', error);
      dispatch({ type: FETCH_USER_BY_ID, payload: null });
    }
  };
};


//---------------------------------------------------------------------//
//Products actions---------------------------------//
export const changeProductStatus = (productId) => {
  return async function (dispatch) {
    const response = await axios.patch("http://localhost:3001/admin/product/edit/status", {productId});
    const product = response.data;
    console.log(product)
    dispatch({ type: CHANGE_PRODUCT_STATUS, payload: product });
  };
}
export const editProduct = (productId,p,data) =>{
let modify = {}
  switch(p){  
    case "stock":
    modify = {  productId: productId,
    updates: {
    stock:data
  }}
  break
  case "price":
    modify = {  productId: productId,
    updates: {
    price:data
  }}
  break
  case "discount":
    modify = {  productId: productId,
    updates: {
    discount:data
  }}
  break
  case "description":
    modify = {  productId: productId,
    updates: {
    description:data
  }}
  break
  default: modify={}

}
console.log(modify)
  return async function (dispatch) {
    const response = await axios.patch("http://localhost:3001/admin/product/edit", modify);
    const product = response.data;
    console.log(product)
    dispatch({ type: EDIT_PRODUCT, payload: product });
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
    dispatch({ type: GET_PRODUCT_BY_NAME, payload: product });
  };
};

export const getProductById = (id) => {
  return async function (dispatch) {
    const bd = await axios.get(`http://localhost:3001/products/id/${id}`);
    const detail = bd.data
    dispatch({ type: GET_PRODUCT_BY_ID, payload: detail });
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
export const actionByName = () => {
  return {
    type: ACTION_BYNAME
  }
}

//---------------------------------------------------------------------//
//Comments actions---------------------------------//

export const getCommentsByProduc = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/comments/product/${id}`);
    const comments = response.data;
    dispatch({ type: GET_COMMENTS_BY_PRODUCT, payload: comments });
  };
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
        dispatch({
          type: ADD_FAVORITE,
          favorite
        });
      } else {
        throw new Error('Error al agregar el favorito');
      }
    } catch (error) {
      let errorMessage = 'Error de conexión';

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      dispatch({
        type: ADD_FAVORITE_ERROR,
        error: errorMessage
      });
    }
  };
};


export const deleteFavorite = (userId, productId) => {
  return async (dispatch) => {
    try {
      // Hacer la solicitud DELETE al backend
      await axios.delete(`http://localhost:3001/favorites/delete/${userId}/${productId}`);

      // Dispatch de la acción para eliminar el producto favorito del state
      dispatch({
        type: DELETE_FAVORITE,
        userId,
        productId
      });
    } catch (error) {
      console.error(error);
      // Manejar el error en caso de fallo en la solicitud
      dispatch({
        type: DELETE_FAVORITE_ERROR,
        error: 'Error al eliminar el producto favorito'
      });
    }
  };
};

export const getFavoritesByUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/favorites/${userId}`);
      const favorites = response.data;

      dispatch({
        type: GET_FAVORITES_SUCCESS,
        favorites: favorites,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: GET_FAVORITES_FAILURE,
        error: "Error al obtener los productos favoritos",
      });
    }
  };
};


//---------------------------------------------------------------------//
//Other actions---------------------------------//
export const page = (page) => {
  console.log(page)
  return function (dispatch) {
    return dispatch({ type: PAGE, payload: page })
  }

}

export function clean() {

  return {
    type: CLEAN
  }

};









