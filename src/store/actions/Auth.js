
import axios from 'axios'


import axiosInstance from '../axiosApi'
import * as actionTypes from './ActionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, refresh_token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        access_token: token,
        refresh_token: refresh_token
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
    localStorage.removeItem('access_token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('refresh_token')
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


export const authLogin = (username, password, setErrorState = null, justSignedUp = false) => {

    return dispatch => {
        dispatch(authStart());
        // axios.post(`${url}/api/token/`, {
        axios.post('/api/token/', {
        // axios.post('http://www.uniquecoverlettergenerator.com/api/token/', {
            username: username,
            password: password
        }).then(response => {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;
            const token = response.data.access;
            const refresh_token = response.data.refresh;
            // const expirationDate = new Date(new Date().getTime() + 5000 * 1000);
            // localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            dispatch(authSuccess(token, refresh_token));
            // dispatch(checkAuthTimeout(5000))
            if (justSignedUp) {
                window.location.href="/signup-user-details/"
            } else {
                window.location.href="/all-jobs/"
            }

        }).catch(err => {
            if (setErrorState !== null){
                setErrorState("Failed to log in. Try again or sign up.")
            }
            dispatch(authFail(err))
        })
    }
}


export const authSignUp = ({ ...data }, setErrorMessage) => {
    const username = data.username
    const password1 = data.password
    const password2 = data.confirm_password
    const email = data.email

    return dispatch => {
        dispatch(authStart());
        // axios.post('http://www.uniquecoverlettergenerator.com/rest-auth/registration/', {
        axios.post('rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(response => {
            const token = response.data.key;
            // const expirationDate = new Date(new Date().getTime() + 5000 * 1000);
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            localStorage.setItem('token', token);
            dispatch(authLogin(username, password1, null, true))
            dispatch(authSuccess(accessToken, refreshToken));
        }).catch(err => {
            setErrorMessage("Either the password was too common (i.e password123), the Username taken, or the Email was. Please try again.")
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('access_token')
        if (token === undefined) {
            dispatch(logout())
        } 
        else {
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