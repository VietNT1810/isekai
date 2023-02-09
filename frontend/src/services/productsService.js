import { request } from '@/utils/request';

const prefix = '/api/products';

export const getProducts = async (params) => {
    try {
        const result = await request.get(`${prefix}/`, { params });
        return result.data;
    } catch (error) {
        return error;
    }
};

export const getProduct = async (slug) => {
    try {
        const result = await request.get(`${prefix}/detail/${slug}`);
        return result.data;
    } catch (error) {
        return error;
    }
};

export const searchProduct = async (params) => {
    try {
        const result = await request.get(`${prefix}/search/${params}`);
        return result.data;
    } catch (error) {
        return error;
    }
};

export const getTabsProduct = async (params) => {
    try {
        const result = await request.get(`${prefix}/tabs`, { params });
        return result.data;
    } catch (error) {
        return error;
    }
};
