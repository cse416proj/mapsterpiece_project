import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./auth-request-api";

const AuthContext = createContext();

// All the types of updates to our auth state that can be processed
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  DELETE_USER: "DELETE_USER",
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL: "CLOSE_MODAL",
  SET_MSG: "SET_MSG",
  SET_ERROR: "SET_ERROR",
  SET_LOST_PW_USER: "SET_LOST_PW_USER"
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    lostPwUser: null,
    msg: null,
    errMsg: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      auth.getLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          user: payload.user,
          loggedIn: payload.loggedIn,
          lostPwUser: null,
          msg: null,
          errMsg: null
        }));
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          user: payload.user,
          loggedIn: true,
          lostPwUser: null,
          msg: payload.msg,
          errMsg: null
        }));
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          user: null,
          loggedIn: false,
          lostPwUser: null,
          msg: null,
          errMsg: null
        }));
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          user: payload.user,
          loggedIn: true,
          lostPwUser: null,
          msg: null,
          errMsg: null
        }));
      }
      case AuthActionType.DELETE_USER: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          user:  null,
          loggedIn: false,
          lostPwUser: null,
          msg: null,
          errMsg: null
        }));
      }
      case AuthActionType.OPEN_MODAL: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          errMsg: payload.errMsg
        }));
      }
      case AuthActionType.CLOSE_MODAL: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          errMsg: null
        }));
      }
      case AuthActionType.SET_MSG: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          msg: payload,
          errMsg: null,
        }));
      }
      case AuthActionType.SET_ERROR: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          errMsg: payload
        }));
      }
      case AuthActionType.SET_LOST_PW_USER: {
        return setAuth((prevAuth) => ({
          ...prevAuth,
          msg: null,
          errMsg: null,
          lostPwUser: payload
        }));
      }
      default:
        return auth;
    }
  };

  auth.getLoggedIn = async function () {
    const response = await api.getLoggedIn();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.GET_LOGGED_IN,
        payload: {
          loggedIn: response.data.loggedIn,
          user: response.data.user,
        },
      });
    }
  };

  auth.registerUser = async function(userName, firstName, lastName, email, password, passwordVerify){
    console.log(userName, firstName, lastName, email, password, passwordVerify);
    let response;
    try {
      response = await api.registerUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        passwordVerify
      );
      if (response.status === 200) {
        auth.loginUser(email, password);
      }
    } catch (error) {
      let errMsg = error.response.data.errorMessage;
      authReducer({
        type: AuthActionType.SET_ERROR,
        payload: errMsg
      });
      return;
    }
  };

  auth.loginUser = async function (email, password) {
    console.log("login console: ", email, password);
    let response;
    try {
      response = await api.loginUser(email, password);
      console.log(response.status);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: response.data.user,
            msg: 'Login success! Now redirecting...'
          },
        });
      }
    } catch (error) {
      let errMsg = error.response.data.errorMessage;
      authReducer({
        type: AuthActionType.SET_ERROR,
        payload: errMsg
      });
      return;
    }
  };

  auth.logoutUser = async function () {
    const response = await api.logoutUser();
    if (response.status === 200) {
      authReducer({
        type: AuthActionType.LOGOUT_USER,
        payload: null,
      });
      navigate("/");
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    return initials;
  };

  auth.getUserName = function () {
    let userName = "";
    if (auth.user) {
      userName += auth.user.userName;
    }
    console.log("userName: " + userName);
    return userName;
  };

  auth.deleteUser = async function (user) {
    console.log(user);
    const userName = user.userName;
    console.log(`userName: ${userName}, callling api to remove now`);
    const response = await api.deleteUser(userName);

    if (response.status === 200) {
      authReducer({
        type: AuthActionType.DELETE_USER,
        payload: null,
      });
      navigate("/");
    }
  };

  auth.closeModal = function () {
    authReducer({
      type: AuthActionType.CLOSE_MODAL,
      payload: null,
    });
  };

  auth.findUser = async function (email) {
    if(!email){
      authReducer({
        type: AuthActionType.SET_ERROR,
        payload: 'Email must be provided',
      });
      return;
    }

    try{
      const response = await api.findUser(email);
      if (response?.status === 200) {
        const user = response.data.user;
        if(user){
          authReducer({
            type: AuthActionType.SET_LOST_PW_USER,
            payload: user
          });
          navigate("/reset-password");
        }
      }
    }
    catch (error) {
      if (error.response) {
        authReducer({
          type: AuthActionType.SET_ERROR,
          payload: (error.response.status === 400) ? error.response.data.errorMessage : error.response.data
        })
      }
    }
  };

  auth.resetPassword = async function(newPassword, confirmNewPassword){
    if(!newPassword || !confirmNewPassword){
      authReducer({
        type: AuthActionType.SET_ERROR,
        payload: 'All fields must be provided to reset password.',
      });
      return;
    }

    if(!auth.lostPwUser){
      authReducer({
        type: AuthActionType.SET_ERROR,
        payload: 'Email info not found. Now redirecting user back to enter email...',
      });
      setTimeout(() => {
        navigate('/forgot-password');
      }, 1000);
      return;
    }

    try{
      const response = await api.resetPassword(auth.lostPwUser?._id, newPassword, confirmNewPassword);
      console.log(response);
      if (response?.status === 200) {
        authReducer({
          type: AuthActionType.SET_MSG,
          payload: 'Password reset success! Now logging in...',
        });
      }
    }
    catch (error) {
      if (error.response) {
        authReducer({
          type: AuthActionType.SET_ERROR,
          payload: (error.response.status === 400 || error.response.status === 401) ? error.response.data.errorMessage : error.response.data
        })
      }
    }
  }

  return (
    <AuthContext.Provider value={{ auth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
