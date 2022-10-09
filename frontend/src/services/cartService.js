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
