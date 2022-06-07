import { combineReducers } from "redux";
import productsReducer from "./product.reducer";

const rootReducer = combineReducers({
    products: productsReducer
})

export default rootReducer;