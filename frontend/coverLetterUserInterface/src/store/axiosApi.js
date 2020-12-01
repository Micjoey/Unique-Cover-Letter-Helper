import axios from 'axios'
import { authCheckState, logout } from './actions/Auth';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 5000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    },

});

axios.interceptors.response.use(response => 
    {
        return response;
    }, error => {
        const originalRequest = error.config;
        // console.log(originalRequest, "originalrequest")
        axios.defaults.headers = {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
        // console.log(localStorage.getItem('refresh_token'))
        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh_token = localStorage.getItem('refresh_token');
            const access_token = localStorage.getItem('access_token');
            // console.log("attempt to refresh -", localStorage.getItem('refresh_token'))
            return axiosInstance
                .post('http://localhost:3000/api/token/refresh/', { refresh: refresh_token, access_token: access_token })
                .then(response => {
                    console.log(response)
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    logout()
                    console.log(err, "user was logged out")
                });
        }
        authCheckState()
        return Promise.reject(error);
    }
    
);


export default axiosInstance
