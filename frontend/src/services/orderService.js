import request from '@/utils/request';

const prefix = '/api/order';

export const createOrder = async (token, param) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.post(`${prefix}/create`, param, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const getUserOrders = async (token, params) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.get(`${prefix}/me`, { params }, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};
