import request from '@/utils/request';

const prefix = '/api/me/addresses';

export const getUserAddress = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.get(`${prefix}/address`, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUserAddress = async (token, addressId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.delete(`${prefix}/delete/${addressId}`, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};
