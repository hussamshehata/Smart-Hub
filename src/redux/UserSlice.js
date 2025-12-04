import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,       // stores user data when logged in
    isLoggedIn: false,    // true when user logs in
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // when user logs in successfully
        login: (state, action) => {
            state.userInfo = action.payload;   // store user data
            state.isLoggedIn = true;
        },

        // when user logs out
        logout(state) {
            state.user = null;
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
