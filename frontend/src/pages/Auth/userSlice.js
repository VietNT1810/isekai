import { getUserProfile, loginUser, registerUser } from '@/actions/userAction';
import { createSlice } from '@reduxjs/toolkit';

//get user token from local storage
const userToken = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null;

const initialState = {
    loading: false,
    userInfo: {},
    userToken,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        // register user
        [registerUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true; // registration successful
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
            console.log('action', action);
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        //get user info
        [getUserProfile.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload.userInfo;
            state.success = true;
        },
        [getUserProfile.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default userSlice.reducer;
