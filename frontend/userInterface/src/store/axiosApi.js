import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
            const refresh_token = localStorage.getItem('refresh_token');

            return axiosInstance
                .post('/token/refresh/', { refresh: refresh_token })
                .then(response => {
                    console.log(response, "logged from axiosApi")
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    console.log("refreshed")
                    axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                    originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    console.log(err)
                });
        }
        return Promise.reject(error);
    }
);
export default axiosInstance
