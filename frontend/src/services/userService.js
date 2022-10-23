import request from '@/utils/request';

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

export const updateUser = async (data) => {
    try {
        const result = await request.patch(`${prefix}/profile/update`, data);
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
