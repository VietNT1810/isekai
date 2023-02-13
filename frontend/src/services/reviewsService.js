import { request } from '@/utils/request';

export const getReviews = async (slug, signal) => {
    try {
        const result = await request.get(`/api/reviews/${slug}`, { signal: signal });
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const createReview = async (params) => {
    try {
        const result = await request.get(`/api/reviews/add`, params);
        return result.data;
    } catch (error) {
        throw error;
    }
};
