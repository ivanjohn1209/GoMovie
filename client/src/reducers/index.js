import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import movieReducer from "./movieReducer";

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    error: errorReducer,
    movie: movieReducer,


});