import request from '@/utils/request';

export const getProducts = async (params) => {
    try {
        const result = await request.get(`/api/products/`, { params });
        return result.data;
    } catch (error) {
        return error;
    }
};
