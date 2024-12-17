"use client";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import eventReducer from "./slices/eventSlice";
import schoolEventReducer from "./slices/schoolEventSlice";
import campusAmbassadorReducer from "./slices/campusAmbassadorSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // auth : authReducer,
  profile: profileReducer,
  event: eventReducer,
  schoolEvent: schoolEventReducer,
  campusAmbassador: campusAmbassadorReducer,
});

// export default rootReducer;

export const store = configureStore({
  reducer: rootReducer,
});
