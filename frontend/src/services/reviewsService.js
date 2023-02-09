import { request } from '@/utils/request';

export const getReviews = async (slug) => {
    try {
        const result = await request.get(`/api/reviews/${slug}`);
        return result.data;
    } catch (error) {
        return error;
    }
};
