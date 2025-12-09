import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice.js";
import cartReducer from "./cartSlice.js";
import favoritesReducer from "./favoriteSlice.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
    },
});

export default store;
