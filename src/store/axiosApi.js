import axios from 'axios'

import { authCheckState} from './actions/Auth';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 3000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        // 'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    },

});

axios.interceptors.response.use(response => 
    {
        return response;
    }, error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh_token = localStorage.getItem('refresh_token');
            const access_token = localStorage.getItem('access_token');
            const url = window.location.origin
            return axiosInstance
                // .post(`${url}/api/token/refresh/`, { refresh: refresh_token, access_token: access_token })
                .post('http://localhost:3000/api/token/refresh/', { refresh: refresh_token, access_token: access_token })
                .then(response => {
                    localStorage.setItem('access_token', response.data.access);
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    authCheckState()
                });
        }
        
        return Promise.reject(error);
    }, () => {
        console.log(`checked state in the axiosAPI`)
        authCheckState()
    }
    
);


export default axiosInstance
