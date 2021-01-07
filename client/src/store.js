import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk"
import rootReducer from "./reducers";

const initialState = {};
 const enhancers = [applyMiddleware(thunk)]
 const store = createStore(rootReducer, initialState , compose(...enhancers))

export default store;