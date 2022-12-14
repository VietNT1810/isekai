import { getUserInfo, login, loginGoogle, register, updateUser } from '@/services/userService';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk('user/register', async ({ username, email, password }) => {
    try {
        const data = await register({ username, email, password });
        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('isLoggedIn', true);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const data = await login({ email, password });
        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('isLoggedIn', true);
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
        const config = {
            headers: {
                Authorization: `Bearer ${user.userToken}`,
            },
        };
        const data = await getUserInfo(config);
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

export const loginByGoogle = createAsyncThunk('user/googleAuth', async ({ token }, { rejectWithValue }) => {
    try {
        const data = await loginGoogle({ id_token: token });
        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('isLoggedIn', true);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
