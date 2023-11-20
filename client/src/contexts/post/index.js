import { createContext, useState, useContext } from "react";
import api from "./post-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

export const PostContext = createContext({});

export const PostActionType = {
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
};

function PostContextProvider(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [postInfo, setPostInfo] = useState({
    currentPost: null,
    currentCommentIndex: null,
    errorMessage: null,
    allPostsByUser: [],
    allCommentsForPost: [],
  });

  const postReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // placeholder to be replace later on
      case PostActionType.SET_CURRENT_POST: {
        return setPostInfo({
          ...postInfo,
          currentPost: payload,
          currentCommentIndex: null,
        });
      }
      case PostActionType.SET_CURRENT_COMMENT: {
        return setPostInfo({
          ...postInfo,
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
      auth.getLoggedIn();
    }
  };

  postInfo.getPostsByPostIds = async function (idList) {
    const response = await api.getPostsByPostIds(idList);
    setPostInfo({
      ...postInfo,
      allPostsByUser: response.data,
    });
  };

  postInfo.deletePostById = async function (postId) {
    const response = await api.deletePostById(postId);
    if (response.data.error) {
      setPostInfo({
        ...postInfo,
        errorMessage: response.data.error,
      });
    } else {
      let tempIds = auth.user.posts;
      const index = tempIds.indexOf(postId);
      if (index > -1) {
        tempIds.splice(index, 1);
      }
      store.getAllPosts();
      if (tempIds.length > 0) {
        postInfo.getPostsByPostIds(tempIds);
      } else {
        setPostInfo({
          ...postInfo,
          allPostsByUser: [],
        });
      }
    }
  };

  postInfo.createComment = async function (postId, commenterUserName, content) {
    const response = await api.createComment(
      postId,
      commenterUserName,
      content
    );
    postInfo.getPostById(postId);
  };

  postInfo.getPostById = async function (postId) {
    const response = await api.getPostById(postId);
    setPostInfo({
      ...postInfo,
      currentPost: response.data,
    });
  };

  postInfo.getCommentsByCommentIds = async function (idList) {
    if (idList === undefined || idList.length === 0) {
      return setPostInfo({
        ...postInfo,
        allCommentsForPost: [],
      });
    }
    const response = await api.getCommentsByCommentIds(idList);
    setPostInfo({
      ...postInfo,
      allCommentsForPost: response.data,
    });
  };

  postInfo.createSubcomment = async function (
    commentId,
    commenterUserName,
    content
  ) {
    const response = await api.createSubcomment(
      commentId,
      commenterUserName,
      content
    );
    postInfo.getPostById(postInfo.currentPost._id);
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
