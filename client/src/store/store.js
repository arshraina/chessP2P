import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice"; // Import your slice reducer

const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;
