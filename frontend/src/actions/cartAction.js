import { getCarts, updateCart } from '@/services/cartService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserCart = createAsyncThunk('cart/get', async ({ userId }, { rejectWithValue }) => {
    try {
        // const { user } = getState();
        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${user.userToken}`,
        //     },
        // };
        const data = await getCarts({ userId });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

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
