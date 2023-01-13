import {
    getUserAddresses,
    getUserProfile,
    loginByGoogle,
    loginUser,
    registerUser,
    updateUserProfile,
} from '@/actions/userAction';
import { createSlice } from '@reduxjs/toolkit';

//get user token from local storage
const userToken = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null;

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            localStorage.removeItem('access-token');
            localStorage.removeItem('isLoggedIn');
            state.loading = false;
            state.userInfo = null;
            state.userToken = null;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.success = true; // registration successful
            state.userToken = action.payload.accessToken;
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        //login user
        [loginUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.email;
            state.userToken = action.payload.accessToken;
            state.success = true;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //get user info
        [getUserProfile.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.success = true;
        },
        [getUserProfile.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //update user info
        [updateUserProfile.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [updateUserProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.user;
            state.success = true;
        },
        [updateUserProfile.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //login user by Google
        [loginByGoogle.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [loginByGoogle.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.email;
            state.userToken = action.payload.accessToken;
            state.success = true;
        },
        [loginByGoogle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //get user address
        [getUserAddresses.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getUserAddresses.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = { ...state.userInfo, addresses: action.payload.content };
            state.success = true;
        },
        [getUserAddresses.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
