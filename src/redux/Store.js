import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.js";
import cartReducer from "./CartSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
});

export default store;

