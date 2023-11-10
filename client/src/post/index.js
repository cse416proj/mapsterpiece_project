import { createContext, useState } from "react";

export const PostContext = createContext({});

export const PostActionType = {
  SET_CURRENT_POST: "SET_CURRENT_POST"
};

function PostContextProvider(props) {
  const [postInfo, setPostInfo] = useState({
    currentPost: null
  });

  const postReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // placeholder to be replace later on
      case PostActionType.SET_CURRENT_POST: {
        return setPostInfo({
          currentPost: payload
        });
      }
      default:
        return postInfo;
    }
  };

  postInfo.setCurrentPost = function (postPayload) {
    postReducer({
      type: PostActionType.SET_CURRENT_POST,
      payload: postPayload,
    });
  };

  return (
    <PostContext.Provider
      value={{
        postInfo,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContext;
export { PostContextProvider };
