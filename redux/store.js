"use client"
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import profileSlice from "./slices/profileSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth:authReducer,
    profile : profileSlice 
})

// export default rootReducer;

export const store = configureStore({
    reducer: rootReducer,

});