import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/pages/Auth/userSlice';
import shopReducer from '@/pages/Shop/shopSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
    },
});

export default store;
