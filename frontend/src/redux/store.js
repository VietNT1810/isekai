import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/pages/Auth/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;