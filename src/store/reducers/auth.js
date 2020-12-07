import * as actionTypes from '../actions/ActionTypes'
import { updateObject } from '../utility'

const initialState = {
    token: null,
    access_token: null,
    refresh_token: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        access_token: action.access_token,
        // refresh_token: action.refresh_token,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        access_token: null,
        refresh_token: null,
        token: null,
    })
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: 
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: 
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: 
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: 
            return authLogout(state, action);
        default:
            return state;
    }
}

export default reducer;