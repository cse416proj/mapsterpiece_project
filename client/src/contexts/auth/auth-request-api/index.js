import { server_base_url } from '../../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: `${server_base_url}/auth`,
})

// All requests that will be making
export const getLoggedIn = () => api.get(`/loggedIn/`)

export const loginUser = (email, password)=>{
    return api.post(`/login/`, {
        email: email, 
        password: password
    })
}

export const logoutUser = () => api.get(`/logout/`)

export const registerUser = (firstName, lastName, userName, email, password, passwordVerify)=>{
    return api.post(`/register/`, {
        firstName: firstName,
        lastName: lastName, 
        userName: userName, 
        email: email, 
        password: password, 
        passwordVerify: passwordVerify
    })
}

export const findUser = (email) => {
    return api.get(`/findUser/${email}`);
}

export const resetPassword = (userId, newPassword, confirmNewPassword) => {
    return api.put(`/resetPassword/`, {
        userId: userId,
        newPassword: newPassword, 
        confirmNewPassword: confirmNewPassword, 
    })
}

const apis = {
    getLoggedIn, 
    registerUser, 
    loginUser, 
    logoutUser,
    findUser,
    resetPassword
}

export default apis