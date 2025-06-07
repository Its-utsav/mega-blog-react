import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false, // false User means user loggedout
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {

            state.userData = action.payload.user;
            state.status = true; // user login
        },
        logout: (state) => {
            state.userData = null;
            state.status = false;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
