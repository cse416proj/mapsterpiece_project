import React, {createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from './auth-request-api';

const AuthContext = createContext();

// All the types of updates to our auth state that can be processed
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER", 
    LOGOUT_USER: "LOGOUT_USER", 
    REGISTER_USER: "REGISTER_USER", 
    OPEN_MODAL: "OPEN_MODAL", 
    CLOSE_MODAL: "CLOSE_MODAL",
}

function AuthContextProvider(props){
    const [auth, setAuth] = useState({
        user: null, 
        loggedIn: false, 
        errMsg: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        if(auth){
            auth.getLoggedIn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const authReducer = (action) => {
        const { type, payload } = action;
        switch(type){
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errMsg: null
                });
            }
            case AuthActionType.LOGIN_USER:{
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errMsg: null
                })
            }
            case AuthActionType.LOGOUT_USER:{
                return setAuth({
                    user: null, 
                    loggedIn: false, 
                    errMsg: null
                });
            }
            case AuthActionType.REGISTER_USER:{
                return setAuth({
                    user: payload.user, 
                    loggedIn: true, 
                    errMsg: null
                });
            }
            case AuthActionType.OPEN_MODAL:{
                return setAuth({
                    user: null, 
                    loggedIn: false, 
                    errMsg: payload.errMsg
                });
            }
            case AuthActionType.CLOSE_MODAL:{
                return setAuth({
                    user: null, 
                    loggedIn: false, 
                    errMsg: null
                });
            }
            default: 
                return auth;
        }
    }

    auth.getLoggedIn = async function(){
        const response = await api.getLoggedIn();

        console.log(response.data);

        if(response.status === 200){
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload:{
                    loggedIn: response.data.loggedIn, 
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userName, firstName, lastName, email, password, passwordVerify){
        console.log(userName, firstName, lastName, email, password, passwordVerify);
        let response;
        try{
            response = await api.registerUser(userName, firstName, lastName, email, password, passwordVerify);
        }catch(error){
            let errMsg = error.response.data.errorMessage;
            authReducer({
                type: AuthActionType.OPEN_MODAL, 
                payload:{
                    errMsg: errMsg
                }
            })
            return;
        }
        if(response.status === 200){
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            navigate("/login");
        }
    }

    auth.loginUser = async function(email, password){
        console.log("login console: ", email, password);
        let response;
        try {
            response=await api.loginUser(email, password); 
            console.log(response.status); 
        } catch (error) {
            let errMsg = error.response.data.errorMessage;
            console.log("error 400", errMsg);
            authReducer({
                type: AuthActionType.OPEN_MODAL, 
                payload: {
                    errMsg: errMsg
                }
            })
            return;
        }
        if(response.status === 200){
            console.log("user to loggin: ",response.data.user);
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            navigate("/");
        }
        
    }

    auth.logoutUser = async function(){
        const response = await api.logoutUser();
        if(response.status === 200){
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            navigate("/");
        }
    }

    auth.getUserInitials = function(){
        let initials = "";
        if (auth.user){
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        return initials;
    }

    auth.getUserName = function(){
        let userName="";
        if(auth.user){
            userName += auth.user.userName;
        }
        console.log("userName: "+ userName);
        return userName;
    }

    auth.closeModal = function(){
        authReducer({
            type: AuthActionType.CLOSE_MODAL,
            payload: null
        })
    }

    return (
        <AuthContext.Provider value ={{auth}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContextProvider};