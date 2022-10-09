import { getUserCart } from '@/actions/cartAction';
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        carts: [],
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: {
        //get all cart
        [getUserCart.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getUserCart.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.carts = payload.cart.products;
            state.success = true;
        },
        [getUserCart.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default cartSlice.reducer;
