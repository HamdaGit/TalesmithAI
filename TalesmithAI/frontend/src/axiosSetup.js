// axiosSetup.js

import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    }
});

axiosInstance.interceptors.request.use(
    async config => {
        let token = Cookies.get('csrftoken');
        if (!token) {
            try {
                const response = await axios.get('http://localhost:8000/api/get_csrf/', { withCredentials: true });
                token = response.data.csrfToken;
                Cookies.set('csrftoken', token);
            } catch (error) {
                console.error('Error fetching CSRF token:', error);
                return Promise.reject(error);
            }
        }
        config.headers['X-CSRFToken'] = token;

        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            config.headers['Authorization'] = `Token ${authToken}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
