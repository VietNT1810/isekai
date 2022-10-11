import request from '@/utils/request';

const prefix = 'api/carts';

export const getCarts = async (params) => {
    try {
        const result = await request.post(`${prefix}/get-cart`, params);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const updateCart = async (params) => {
    try {
        const result = await request.put(`${prefix}/update`, params);
        return result.data;
    } catch (error) {
        throw error;
    }
};
