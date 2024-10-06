// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use the environment variable
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add request/response interceptors
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add custom logic here before sending the request
        // For example, you can add an Authorization header if you have a token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors globally
        console.error('Error response:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
