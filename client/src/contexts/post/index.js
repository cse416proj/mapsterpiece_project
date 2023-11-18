import { createContext, useState } from "react";
import api from "./post-request-api";

export const PostContext = createContext({});

export const PostActionType = {
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
};

function PostContextProvider(props) {
  const [postInfo, setPostInfo] = useState({
    currentPost: null,
    currentCommentIndex: null,
    errorMessage: null,
  });

  const postReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // placeholder to be replace later on
      case PostActionType.SET_CURRENT_POST: {
        return setPostInfo({
          currentPost: payload,
          currentCommentIndex: null,
        });
      }
      case PostActionType.SET_CURRENT_COMMENT: {
        return setPostInfo({
          currentPost: postInfo.currentPost,
          currentCommentIndex: payload,
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

  postInfo.setCurrentComment = function (commentPayload) {
    postReducer({
      type: PostActionType.SET_CURRENT_COMMENT,
      payload: commentPayload,
    });
  };

  // hardcoded function to be replaced
  postInfo.addCommentToCurrentPost = function (comment) {
    const curPost = postInfo.currentPost;
    const newComment = {
      commentUserName: "dummyCommentUser",
      text: comment,
      dateCommented: "2023-11-05T19:17:42.514Z",
      subComments: [],
    };
    curPost.comments.push(newComment);
    postReducer({
      type: PostActionType.SET_CURRENT_POST,
      payload: curPost,
    });
  };

  // hardcoded function to be replaced
  postInfo.addCommentToCurrentComment = function (comment) {
    const curPost = postInfo.currentPost;
    const curComment = curPost.comments[postInfo.currentCommentIndex];
    const newComment = {
      commentUserName: "dummyCommentUser",
      text: comment,
      dateCommented: "2023-11-05T19:17:42.514Z",
    };
    curComment.subComments.push(newComment);
    curPost.comments[postInfo.currentCommentIndex] = curComment;

    postReducer({
      type: PostActionType.SET_CURRENT_POST,
      payload: curPost,
    });
  };

  postInfo.createPost = async function (title, tags, content) {
    const response = await api.createPost(title, tags, content);
    if (response.data.error) {
      setPostInfo({
        ...postInfo,
        errorMessage: response.data.error,
      });
    } else {
      setPostInfo({
        ...postInfo,
        errorMessage: null,
      });
    }
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
