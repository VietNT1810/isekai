import { logoutUser } from '@/pages/Auth/userSlice';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
const API_PROVINCE = import.meta.env.VITE_PROVINCE_URL;

const userToken = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null;

//base api request
export const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
    },
});

request.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log('interceptor err:', error);
        if (error.response.status == 401 && error.response.data.code == 'ERR_EXPIRED_TOKEN') {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    },
);

//province request
export const provinceRequest = axios.create({ baseURL: API_PROVINCE });
