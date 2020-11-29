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

axios.interceptors.response.use(response => {
    return response;
}, err => {
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            originalReq._retry = true;

            let res = fetch('http://localhost:3000/api/token/refresh/', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Device': 'device',
                    'Token': localStorage.getItem("access_token"),
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                    token: localStorage.getItem("access_token"),
                    refresh_token: localStorage.getItem("refresh_token")
                }),
            }).then(res => res.json()).then(res => {
                console.log(res);
                this.setSession({ token: res.token, refresh_token: res.refresh });
                originalReq.headers['access_token'] = res.token;
                originalReq.headers['Device'] = "device";
                return axios(originalReq);
            });


            resolve(res);
        }


        return Promise.reject(err);
    });
});
// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
//             const refresh_token = localStorage.getItem('refresh_token');

//             return axiosInstance
//                 .post('/token/refresh/', { refresh: refresh_token })
//                 .then(response => {
//                     localStorage.setItem('access_token', response.data.access);
//                     localStorage.setItem('refresh_token', response.data.refresh);
//                     console.log("refreshed")
//                     axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
//                     originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

//                     return axiosInstance(originalRequest);
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 });
//         }
//         return Promise.reject(error);
//     }
// );
export default axiosInstance
