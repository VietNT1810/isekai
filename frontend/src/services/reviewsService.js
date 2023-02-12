import { request } from '@/utils/request';

export const getReviews = async (slug, signal) => {
    try {
        const result = await request.get(`/api/reviews/${slug}`, { signal: signal });
        return result.data;
    } catch (error) {
        return error;
    }
};
