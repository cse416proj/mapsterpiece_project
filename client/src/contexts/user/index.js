import { createContext, useState, useEffect } from "react";
import api from "./user-request-api";

export const UserContext = createContext({});

export const UserActionType = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

function UserContextProvider(props) {
  const [userInfo, setUserInfo] = useState({
    currentUser: null,
    currentMaps: null,
    currentPosts: null
  });

  // to be removed: print when userInfo update
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  const userReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
        case UserActionType.SET_CURRENT_USER: {
          return setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              currentUser: payload
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
    return `${userInfo.currentMaps.length} maps`;
  }

  userInfo.getNumPosts = function(){
    return `${userInfo.currentPosts.length} posts`;
  }

  userInfo.getUserById = async function (userId) {
    const response = await api.getUserById(userId);
    userReducer({
      type: UserActionType.SET_CURRENT_USER,
      payload: response.data,
    });
  };

  userInfo.deleteUserById = async function (userId) {
    const response = await api.deleteUserById(userId);
  };

  return (
    <UserContext.Provider value={{ userInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };