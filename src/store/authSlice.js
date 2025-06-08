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
            // console.log(action.payload);
            localStorage.setItem("userData", JSON.stringify(action.payload.user));
            state.userData = action.payload.user;
            state.status = true; // user login
            // console.log(localStorage.getItem("userData"))
        },
        logout: (state) => {
            state.userData = null;
            state.status = false;
            localStorage.removeItem("userData");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
