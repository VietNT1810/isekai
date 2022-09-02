import request from '@/utils/request';

const prefix = '/api/users';

export const register = async (params, config) => {
    try {
        const result = await request.post(`${prefix}/signup`, params, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (params, config) => {
    try {
        const result = await request.post(`${prefix}/login`, params, config);
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