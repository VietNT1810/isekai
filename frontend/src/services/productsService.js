import request from '@/utils/request';

export const getProducts = async (params) => {
    try {
        const result = await request.get(`/api/products/`, { params });
        return result.data;
    } catch (error) {
        return error;
    }
};

export const getProduct = async (slug) => {
    try {
        const result = await request.get(`/api/products/detail/${slug}`);
        return result.data;
    } catch (error) {
        return error;
    }
};
