import {useReducer} from 'react'
import {SUCCESSFUL_REGISTRATION, ERROR_REGISTRATION, GET_USER, SUCCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT} from '../../types';
import AuthContext from './authContext'
import authReducer from './authReducer';
import clientAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth';

const AuthState = props =>{
    
    const initialState = {
        token: localStorage.getItem('token'),
        auth:null,
        user:null,
        message: null,
        loading: true,
    }
    
    const [state, dispatch] = useReducer(authReducer,initialState)
    
    const userRegistration =  async data => {
        try {
            const response = await clientAxios.post('/api/users', data)
            
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            })
            
            //get the user
            authUser();

        } catch (error) {
            const alert = {
                msg:error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_REGISTRATION,
                payload: alert
            })
        }
    }

    //return the auth user
    const authUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            //send token with headers
            tokenAuth(token);
        }

        try {
            const response = await clientAxios.get('/api/auth');
            dispatch({
                type:GET_USER,
                payload: response.data.user
            })
            
        } catch (error) {
            
            dispatch({
                type:ERROR_LOGIN
            })
        }
    }


    //when the user sign in
    const signIn = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });
            authUser();

        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg:error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })
        }
    }
    const logOut = () => {
        dispatch({
            type:LOG_OUT
        })
    }

    return(
        <AuthContext.Provider
        value={{
            token:state.token,
            auth:state.auth,
            user:state.user,
            message:state.message,
            loading: state.loading,
            userRegistration,
            signIn,
            authUser,
            logOut,
        }}>
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthState;