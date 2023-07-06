import{
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
  GET_FAVORITES_FAILURE

} from './actions'

const initialState = {
  commentsByProduct:[],
  productsbyName:[],
  page: 1,
  products: [],
  filteredProducts: [],
  selectedCategory: "",
  sortOrder: '', 
  detail: [],
  categories: [],
  cart:[],
  totalProducts:0,
  actionByName:false,
  cartUser:[],
  ratings: [],
  favorites: [],
  error: null,

};

const rootReducer= (state=initialState,action)=>{
switch(action.type){
  case GET_COMMENTS_BY_PRODUCT:
    return {...state,commentsByProduct:action.payload}
    
  case ACTION_BYNAME:
    return {...state,actionByName:true}
  case DELETE_PRODUCT:
    return{...state}
  case MODIFY_QUANTITY:
    
    return{...state}
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


//---------------------------------------------------------------------//
//Get Products cases---------------------------------//

  case GET_PRODUCTS:
    return {
      ...state,
      actionByName:false,
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
      
        console.log({
          ...state,
          filteredProducts: filteredByCategory,
          selectedCategory: category,
      });
      
        return {
          ...state,
          filteredProducts: filteredByCategory,
          selectedCategory: category,
      };

    case GET_CATEGORIES:
        return { ...state, categories: action.payload };

    case GET_PRODUCT_BY_ID:
      
        if(action.payload==='not found')
        return {...state}
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
    case ADD_RATING:
                  const newRating = action.payload;
                  const updatedRatings = [...state.ratings, newRating];
                  
                  return {
                    ...state,
                    ratings: updatedRatings,
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
        return{
            ...state,
            // actionByName:false,
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
