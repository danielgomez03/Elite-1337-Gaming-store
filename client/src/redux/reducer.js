import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  GET_PRODUCT_BY_ID,
  GET_CATEGORIES,
  GET_RATINGS,
  GET_RATINGS_ERROR,
  ADD_RATING,
  SORT_PRODUCTS,
  FILTER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_CATEGORY,
  MODIFY_QUANTITY,
  ADD_PRODUCT_TO_CART,
  GET_CART_BY_ID_USER,
  TOTAL_PRODUCTS,
  DELETE_PRODUCT,
  ACTION_BYNAME,
  PAGE,
  CLEAN,
  ADD_FAVORITE,
  ADD_FAVORITE_ERROR,
  GET_COMMENTS_BY_PRODUCT,
  DELETE_FAVORITE,
  DELETE_FAVORITE_ERROR,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER_BY_ID,

  ADD_RATING_SUCCESS,
  ADD_RATING_FAILURE,

  POST_LOGIN,
  POST_LOGOUT,
  CONFIRM_SESSION,
  CHANGE_USER,

  MODIFI_ISACTIVE_USER,
  EDIT_PRODUCT,
  CHANGE_PRODUCT_STATUS,

} from './actions'

const initialState = {
  token: "",
  typeUser: "guest",
  session: false,
  userId: "",
  errorMessage: "",
  commentsByProduct: [],
  productsbyName: [],
  page: 1,
  products: [],
  filteredProducts: [],
  selectedCategory: "",
  sortOrder: '',
  detail: [],
  categories: [],
  cart: [],
  totalProducts: 0,
  actionByName: false,
  cartUser: [],
  ratings: [],
  favorites: [],
  error: null,
  users: [],
  user: {},
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //---------Session cases----/
    case POST_LOGIN:
      const { token, userId, error } = action.payload;
      if (error) {
        return { ...state, errorMessage: error };
      } else {
        return { ...state, token: token, userId: userId, session: true, errorMessage: "" };
      };
    case POST_LOGOUT:
      return { ...state, token: "", typeUser: "guest", userId: "", session: false, user: {} };
    case CONFIRM_SESSION:
      return { ...state, token: action.payload.token, userId: action.payload.userId, session: true }
    case CHANGE_USER:
      return { ...state, typeUser: action.payload };
    //--------------------------/
    case GET_COMMENTS_BY_PRODUCT:
      return { ...state, commentsByProduct: action.payload }

    case ACTION_BYNAME:
      return { ...state, actionByName: true }
    case DELETE_PRODUCT:
      return { ...state }
    case MODIFY_QUANTITY:

      return { ...state }
    case GET_CART_BY_ID_USER:
      return { ...state, cartUser: action.payload };
    case TOTAL_PRODUCTS:

      return { ...state, totalProducts: state.totalProducts + 1 };
    case ADD_PRODUCT_TO_CART:
      return { ...state, cart: action.payload }

  case MODIFI_ISACTIVE_USER:
    return {...state}



    //---------------------------------------------------------------------//
    //User´s cases---------------------------------//

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_USER_BY_ID:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: action.payload ? null : 'An error occurred while retrieving the user by ID'
      };

    //---------------------------------------------------------------------//
    //Get Products cases---------------------------------//
    case CHANGE_PRODUCT_STATUS:
      return {
        ...state
      }
    case EDIT_PRODUCT:
      return {
        ...state
      }
    case GET_PRODUCTS:
      return {
        ...state,
        actionByName: false,
        products: [...action.payload],
        filteredProducts: [...action.payload]
      };
    case GET_PRODUCT_BY_NAME:
      console.log(action.payload)
      return { ...state, productsbyName: action.payload };

    //---------------------------------------------------------------------//
    //Categories filters cases---------------------------------//

    case FILTER_PRODUCTS_BY_CATEGORY:
      const { category } = action.payload;
      const filteredByCategory = [];

      state.products.forEach((product) => {
        if (
          product.category.name === category ||
          product.category.parent.name === category ||
          product.category.parent.parent?.name === category
        ) {
          // Verificar si el producto ya existe en el nuevo array antes de agregarlo
          if (!filteredByCategory.some((p) => p.productId === product.productId)) {
            filteredByCategory.push(product);
          }
        }
      });

      return {
        ...state,
        filteredProducts: filteredByCategory,
        selectedCategory: category,
      };

    case GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case GET_PRODUCT_BY_ID:

      if (action.payload === 'not found')
        return { ...state }
      return { ...state, detail: action.payload };

    //---------------------------------------------------------------------//
    //Price Filters cases---------------------------------//
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

    //---------------------------------------------------------------------//
    //Ordenamientos cases---------------------------------//
    case SORT_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
        sortOrder: action.payload.length > 0 ? state.sortOrder : '', // Restablece el sortOrder si no hay productos filtrados
      };
    //---------------------------------------------------------------------//
    //Rating cases---------------------------------//   
    case GET_RATINGS:
      return {
        ...state,
        ratings: action.payload,
        error: null,
      };
      case ADD_RATING_SUCCESS:
        return {
          ...state,
          ratings: [...state.ratings, action.payload], // Agrega el nuevo rating al estado
        };
  
      case ADD_RATING_FAILURE:
        return {
          ...state,
          error: action.payload,
        };
    case GET_RATINGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    //---------------------------------------------------------------------//
    //Favorites cases---------------------------------//
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
        error: null
      };
    case ADD_FAVORITE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case DELETE_FAVORITE:
      // Filtrar el producto favorito eliminado del state
      return state.filter((favorite) => !(favorite.userId === action.userId && favorite.productId === action.productId));

    case DELETE_FAVORITE_ERROR:
      // Manejar el error y posiblemente actualizar el estado o mostrar un mensaje de error
      console.error(action.error);
      return state;

    case GET_FAVORITES_SUCCESS:
      return {
        ...state,
        favorites: action.favorites,
        error: null,
      };

    case GET_FAVORITES_FAILURE:
      return {
        ...state,
        favorites: [],
        error: action.error,
      };
    //---------------------------------------------------------------------//
    //other cases---------------------------------//  
    case CLEAN:
      return {
        ...state,
        // actionByName:false,
        detail: []
      }
    case PAGE:

      return {
        ...state, page: action.payload
      }
    default: return { ...state }
  }

}
export default rootReducer;
