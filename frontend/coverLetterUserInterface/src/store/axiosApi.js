import axios from 'axios'
import { authCheckState, logout } from './actions/Auth';

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
        // console.log(originalRequest, "<--- originalrequest, error --> ",error )
        // console.log(localStorage.getItem('refresh_token', "this is outside the error call", localStorage.getItem('access_token')))
        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            // console.log(localStorage)
            const refresh_token = localStorage.getItem('refresh_token');
            const access_token = localStorage.getItem('access_token');
            console.log("attempt to refresh -", localStorage.getItem('refresh_token'))
            return axiosInstance
                .post('http://localhost:3000/api/token/refresh/', { refresh: refresh_token, access_token: access_token })
                .then(response => {
                    // console.log(response, "inside axios instance post call")
                    localStorage.setItem('access_token', response.data.access);
                    // console.log(localStorage, "inside axios instance post call")
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                    // console.log(originalRequest, "inside axios instance post call, localStorage -->", localStorage)
                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    console.log(err, "user was logged out")
                    // alert("There was an error, logged inside the axiosAPI")
                    // alert("You've been logged out.")
                    // logout()
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
