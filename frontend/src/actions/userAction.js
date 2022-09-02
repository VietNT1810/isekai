import { login, register } from '@/services/userService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('user/register', async ({ username, email, password }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await register({ username, email, password }, config);
    } catch (error) {
        console.log(error.response);
    }
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const data = await login({ email, password }, config);
        localStorage.setItem('access-token', data.accessToken);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
