import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const API_PROVINCE = import.meta.env.VITE_PROVINCE_URL;

const userToken = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null;

export const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
    },
});

export const provinceRequest = axios.create({ baseURL: API_PROVINCE });
