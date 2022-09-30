import { getUserInfo, login, register, updateUser } from '@/services/userService';
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
        const data = await login({ email, password });
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

export const getUserProfile = createAsyncThunk('user/profile', async (arg, { getState, rejectWithValue }) => {
    try {
        const { user } = getState();
        const data = await getUserInfo();
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const updateUserProfile = createAsyncThunk(
    'user/profile/update',
    async ({ fullName, address, fileString, gender }, { rejectWithValue }) => {
        try {
            const data = await updateUser({ fullName, address, fileString, gender });
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
