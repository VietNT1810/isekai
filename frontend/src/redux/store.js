import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/pages/Auth/userSlice';
import shopReducer from '@/pages/Shop/shopSlice';
import cartReducer from '@/pages/Cart/cartSlice';
import alertReducer from '@/reducers/alertSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        shop: shopReducer,
        cart: cartReducer,
        alert: alertReducer,
    },
});

export default store;
