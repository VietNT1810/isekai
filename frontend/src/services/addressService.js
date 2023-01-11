import request from '@/utils/request';
import axios from 'axios';

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

export const getSingleAddress = async (addressId, token, signal) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.get(`${prefix}/address/${addressId}`, { signal: signal }, config);
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

export const getListCity = async (signal) => {
    try {
        const result = await axios.get('https://provinces.open-api.vn/api/p/', { signal: signal });
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const getListDistrict = async (cityCode) => {
    try {
        const result = await axios.get(`https://provinces.open-api.vn/api/p/${cityCode}/?depth=2`);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const getListWard = async (districtCode) => {
    try {
        const result = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}/?depth=2`);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const createAddress = async (params, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.post(`${prefix}/add`, params, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const editAddress = async (params, token, id) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const result = await request.patch(`${prefix}/edit/${id}`, params, config);
        return result.data;
    } catch (error) {
        throw error;
    }
};
