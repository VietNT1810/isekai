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
            params,
        };
        const result = await request.get(`${prefix}/me`, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const cancelOrder = async (token, orderId, params) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.post(`${prefix}/cancel/${orderId}`, params, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};
