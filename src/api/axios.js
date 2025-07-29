import axios from 'axios';

// Create an axios instance
const api = axios.create({
    baseURL: 'https://job-tracker-api-j2fp.onrender.com/api/v1', 
});

// Use an interceptor to add the auth token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;