import { addUserCart, getUserCart, removeUserCart, updateUserCart } from '@/actions/cartAction';
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false,
        userId: '',
        carts: [],
        error: null,
        success: false,
    },
    reducers: {
        changeCartQuantity: (state, action) => {
            const productCart = state.carts.find((cart) => cart.productId._id == action.payload.productId);
            if (productCart) {
                productCart.quantity = action.payload.quantity;
            }
        },
        removeCart: (state, action) => {
            state.carts = state.carts.filter((cart) => cart.productId._id != action.payload);
        },
    },
    extraReducers: {
        //get all cart
        [getUserCart.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getUserCart.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.carts = payload.cart.products;
            state.userId = payload.cart.userId;
            state.success = true;
        },
        [getUserCart.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        //add to cart
        [addUserCart.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [addUserCart.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.carts = payload.cart.products;
            state.userId = payload.cart.userId;
            state.success = true;
        },
        [addUserCart.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        //update user cart
        [updateUserCart.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [updateUserCart.fulfilled]: (state) => {
            state.loading = false;
            state.success = true;
        },
        [updateUserCart.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },

        //remove user cart
        [removeUserCart.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [removeUserCart.fulfilled]: (state) => {
            state.loading = false;
            state.success = true;
        },
        [removeUserCart.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const { changeCartQuantity, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
