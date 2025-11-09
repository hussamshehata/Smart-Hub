import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.js";
import cartReducer from "./cartSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;
