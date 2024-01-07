"use client"
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import profileReducer from "./slices/profileSlice"
import eventReducer from "./slices/eventSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    // auth : authReducer,
    profile : profileReducer,
    event : eventReducer,
})

// export default rootReducer;

export const store = configureStore({
    reducer: rootReducer,

});