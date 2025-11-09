import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.js";
import cartReducer from "./Cartslice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
});

export default store;

