import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserActionType = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

function UserContextProvider(props) {
  const [userInfo, setUserInfo] = useState({
    currentUser: null,
  });

  const userReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
        case UserActionType.SET_CURRENT_USER:
            return setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                currentUser: payload
            }));
      default:
        return userInfo;
    }
  };

  userInfo.setCurrentPost = function (user) {
    userReducer({
      type: UserActionType.SET_CURRENT_USER,
      payload: user,
    });
  };

//   userInfo.setCurrentComment = function (commentPayload) {
//     userReducer({
//       type: UserActionType.SET_CURRENT_COMMENT,
//       payload: commentPayload,
//     });
//   };

//   // hardcoded function to be replaced
//   userInfo.addCommentToCurrentPost = function (comment) {
//     const curPost = userInfo.currentPost;
//     const newComment = {
//       commentUserName: "dummyCommentUser",
//       text: comment,
//       dateCommented: "2023-11-05T19:17:42.514Z",
//       subComments: [],
//     };
//     curPost.comments.push(newComment);
//     userReducer({
//       type: UserActionType.SET_CURRENT_POST,
//       payload: curPost,
//     });
//   };

//   // hardcoded function to be replaced
//   userInfo.addCommentToCurrentComment = function (comment) {
//     const curPost = userInfo.currentPost;
//     const curComment = curPost.comments[userInfo.currentCommentIndex];
//     const newComment = {
//       commentUserName: "dummyCommentUser",
//       text: comment,
//       dateCommented: "2023-11-05T19:17:42.514Z",
//     };
//     curComment.subComments.push(newComment);
//     curPost.comments[userInfo.currentCommentIndex] = curComment;

//     userReducer({
//       type: UserActionType.SET_CURRENT_POST,
//       payload: curPost,
//     });
//   };

  return (
    <UserContext.Provider value={{ userInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };