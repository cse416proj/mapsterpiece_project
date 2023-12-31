import { createContext, useState, useEffect } from "react";
import api from "./user-request-api";

export const UserContext = createContext({});

export const UserActionType = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_ERROR: "SET_ERROR",
};

function UserContextProvider(props) {
  const [userInfo, setUserInfo] = useState({
    currentUser: null,
    currentMaps: null,
    currentPosts: null,
    error: null
  });

  // // to be removed: print when userInfo update
  // useEffect(() => {
  //   console.log(userInfo);
  // }, [userInfo])

  const userReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case UserActionType.SET_CURRENT_USER: {
        return setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            error: null,
            currentUser: payload
        }));
      }
      case UserActionType.SET_ERROR: {
        return setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            error: payload
        }));
      }
      default:
        return userInfo;
    }
  };

  userInfo.setCurrentUser = function(user){
    userReducer({
      type: UserActionType.SET_CURRENT_USER,
      payload: user,
    });
  };

  userInfo.getUserInitials = function(){
    let initials = "";
    if(userInfo.currentUser){
      initials += userInfo.currentUser.firstName.charAt(0);
      initials += userInfo.currentUser.lastName.charAt(0);
    }
    return initials;
  }

  userInfo.getUserFullName = function(){
    return `${userInfo.currentUser.firstName} ${userInfo.currentUser.lastName}`;
  }

  userInfo.getUserName = function(){
    return `@${userInfo.currentUser.userName}`;
  }

  userInfo.getNumMaps = function(){
    const count = userInfo.currentMaps.length;
    return `${count} ${(count > 1) ? 'maps' : 'map'}`;
  }

  userInfo.getNumPosts = function(){
    const count = userInfo.currentPosts.length;
    return `${count} ${(count > 1) ? 'posts' : 'post'}`;
  }

  userInfo.setErrorMsg = function (msg){
    userReducer({
      type: UserActionType.SET_ERROR,
      payload: msg
    });
  }

  userInfo.getUserById = async function (userId) {
    try{
      const response = await api.getUserById(userId);
      userReducer({
        type: UserActionType.SET_CURRENT_USER,
        payload: response.data,
      });
    }
    catch(error){
      userInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error.response?.data?.errorMessage : 'Error getting user');
    }
  };

  userInfo.deleteUserById = async function (userId) {
    try{
      const response = await api.deleteUserById(userId);
    }
    catch(error){
      userReducer({
        type: UserActionType.SET_ERROR,
        payload: (error?.response?.data?.errorMessage) ? error.response?.data?.errorMessage : 'Error deleting user'
      });
    }
  };

  userInfo.updateMaps = function (newMaps) {
    return setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      currentUser: {
        ...prevUserInfo.currentUser,
        maps: newMaps
      }
    }));
  }

  userInfo.updatePosts = function (newPosts) {
    return setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      currentUser: {
        ...prevUserInfo.currentUser,
        posts: newPosts
      }
    }));
  }

  return (
    <UserContext.Provider value={{ userInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };