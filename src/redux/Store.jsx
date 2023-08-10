import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import userDataReducer from "./slice/userDataSlice";
import ProductDataReducer from "./slice/ProductDataSlice";
import cartDataReducer from "./slice/CartDataSlice";
import ReciepientDataReducer from "./slice/ReciepientDataSlice";
const Store=configureStore({
    reducer:{
        auth:authReducer,
        users:userDataReducer,
        allProduct:ProductDataReducer,
        cartData:cartDataReducer,
        recipientData:ReciepientDataReducer,
    }
})
export default Store