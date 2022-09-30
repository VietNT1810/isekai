import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

const userToken = localStorage.getItem('access-token') ? localStorage.getItem('access-token') : null;

const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
    },
});

export default request;
