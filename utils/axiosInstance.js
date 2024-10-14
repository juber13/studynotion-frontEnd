import axios from 'axios';
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL : `${import.meta.env.VITE_BACKEND_BASE_URL}/api`,
});



// Request interceptor to add the JWT token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;