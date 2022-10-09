import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/pages/Auth/userSlice';
import shopReducer from '@/pages/Shop/shopSlice';
import cartReducer from '@/pages/Cart/cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        cart: cartReducer,
    },
});

export default store;
