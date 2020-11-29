import axios from 'axios'
import axiosInstance from '../axiosApi'
import * as actionTypes from './ActionTypes'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('access_token')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}


export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://localhost:3000/api/token/', {
            username: username,
            password: password
        }).then(response => {
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
            const token = response.data.access;
            const expirationDate = new Date(new Date().getTime() + 5000 * 1000);
            // localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(5000))
            window.location.href="/jobs/"
        }).catch(err => {
            throw err;
        })
        // axios.post('http://127.0.0.1:3000/rest-auth/login/', {
        //     username: username,
        //     password: password
        // })
        // .then(res => {
        //     const token = res.data.key;
        //     const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        //     axiosInstance.defaults.headers['Authorization'] = "Bearer " + res.data.access;
        //     localStorage.setItem('token', token);
        //     localStorage.setItem('expirationDate', expirationDate);
        //     localStorage.setItem('access_token', res.data.access);
        //     localStorage.setItem('refresh_token', res.data.refresh);
        //     dispatch(authSuccess(token));
        //     dispatch(checkAuthTimeout(3600))
        // }).catch(err => {
        //     dispatch(authFail(err.response.data.non_field_errors[0]))
        // })
    }
}


export const authSignUp = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:3000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 5000 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(5000))})
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('access_token')
        if (token === undefined) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}