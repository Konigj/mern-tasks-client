import {SUCCESSFUL_REGISTRATION, ERROR_REGISTRATION, GET_USER, SUCCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT} from '../../types';

export default (state, action) => {
    switch (action.type) {
    
        case SUCCESSFUL_REGISTRATION:
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                auth:true,
                message:null,
                loading:false,
            }
        case LOG_OUT:
        case ERROR_LOGIN:
        case ERROR_REGISTRATION:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                auth:null,
                message:action.payload,
                loading:false,
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                auth:true,
                loading:false,
            }
        default: return state;
    }
}