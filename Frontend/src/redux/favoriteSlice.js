import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    items: [],
};

export const favoriteSlice = createSlice({
    name: "favorites" ,
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const item = action.payload;
            const exists = state.items.find((fav) => fav.id === item.id);   
    
            if (!exists) {
                state.items.push(item);
            }
        },
        
        removeFromFavorites: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((fav) => fav.id !== id);
        },

        toggleFavorite: (state, action) => {
            const item = action.payload;
            const exists = state.items.find((fav) => fav.id === item.id);

            if (exists) {
                state.items = state.items.filter((fav) => fav.id !== item.id);
            } else {
                state.items.push(item);
            }
        }
    },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;