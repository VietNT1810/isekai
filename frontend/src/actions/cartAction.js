import { addToCart, getCarts, removeCart, updateCart } from '@/services/cartService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserCart = createAsyncThunk('cart/get', async ({ userId }, { rejectWithValue }) => {
    try {
        const data = await getCarts({ userId, status: 'active' });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const addUserCart = createAsyncThunk(
    'cart/add',
    async ({ userId, productId, quantity }, { rejectWithValue }) => {
        try {
            const data = await addToCart({ userId, productId, quantity });
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const updateUserCart = createAsyncThunk('cart/update', async ({ productId }, { getState, rejectWithValue }) => {
    try {
        const { userId, carts } = getState().cart;
        const productCart = carts.find((cart) => cart.productId._id == productId);
        const data = await updateCart({ userId, productId, quantity: productCart.quantity });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const removeUserCart = createAsyncThunk('cart/remove', async ({ productId }, { getState, rejectWithValue }) => {
    try {
        const { cartId, carts } = getState().cart;
        const productCart = carts.find((cart) => cart.productId._id == productId);
        const data = await removeCart({ cartId, productId, quantity: productCart.quantity });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
