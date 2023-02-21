import { request } from '@/utils/request';

const prefix = '/api/users';

export const register = async (params) => {
    try {
        const result = await request.post(`${prefix}/signup`, params);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (params) => {
    try {
        const result = await request.post(`${prefix}/login`, params);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const getUserInfo = async (config) => {
    try {
        const result = await request.get(`${prefix}/profile`, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (data, config) => {
    try {
        const result = await request.patch(`${prefix}/profile/update`, data, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const loginGoogle = async (params) => {
    try {
        const result = await request.get(`${prefix}/google-auth`, { params });
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const forgotPassword = async (params) => {
    try {
        const result = await request.post(`${prefix}/forgot-password`, params);
        return result.data;
    } catch (error) {
        throw error.response;
    }
};

export const resetPassword = async (password, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.post(`${prefix}/reset-password`, password, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (params, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.post(`${prefix}/change-password`, params, config);
        return result.data;
    } catch (error) {
        throw error.response.data;
    }
};
