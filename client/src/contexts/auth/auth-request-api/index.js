import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: 'http://mapsterpiece.online:4000/auth',
    // baseURL: 'http://localhost:4000/auth',
})

// All requests that will be making
export const getLoggedIn = () => api.get(`/loggedIn/`)

export const loginUser = (email, password)=>{
    return api.post(`/login/`,{
        email: email, 
        password: password
    })
}

export const logoutUser = () => api.get(`/logout/`)

export const registerUser = (firstName, lastName, userName, email, password, passwordVerify)=>{
    return api.post(`/register/`,{
        firstName: firstName,
        lastName: lastName, 
        userName: userName, 
        email: email, 
        password: password, 
        passwordVerify: passwordVerify
    })
}

export const deleteUser = (userName) => {
    console.log('******deleteUser*******');
    console.log(userName);
    return api.delete(`/user/`,{
        userName: userName
    })
};

const apis = {
    getLoggedIn, 
    registerUser, 
    loginUser, 
    logoutUser,
    deleteUser
}

export default apis