import {applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore} from 'redux';


import rootReducer from "./reducer";

import thunkMiddleware from "redux-thunk";

const composeEnhancer = compose;

const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunkMiddleware)));

export default store;

