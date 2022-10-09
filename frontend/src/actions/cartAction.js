import { getCarts } from '@/services/cartService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserCart = createAsyncThunk('cart/get', async ({ userId }) => {
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
