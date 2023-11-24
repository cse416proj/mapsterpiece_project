import { createContext, useState, useContext } from "react";
import api from "./post-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

export const PostContext = createContext({});

export const PostActionType = {
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
  SET_CURRENT_SUBCOMMENT: "SET_CURRENT_SUBCOMMENT",
  UPDATE_ALL_COMMENTS: "UPDATE_ALL_COMMENTS",
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
      case PostActionType.SET_CURRENT_POST: {
        return setPostInfo({
          ...postInfo,
          currentPost: payload,
          currentCommentIndex: null,
          errorMessage: null,
          allPostsByUser: [],
          allCommentsForPost: [],
        });
      }
      case PostActionType.SET_CURRENT_COMMENT: {
        return setPostInfo({
          ...postInfo,
          currentPost: postInfo.currentPost,
          currentCommentIndex: payload,
        });
      }
      case PostActionType.SET_CURRENT_SUBCOMMENT: {
        return setPostInfo({
          ...postInfo, 
          currentPost: postInfo.currentPost, 
          currentCommentIndex: payload.comment,
        });
      }
      case PostActionType.UPDATE_ALL_COMMENTS: {
        return setPostInfo({
          ...postInfo, 
          allCommentsForPost: payload
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

  postInfo.clearCurrentComment = function () {
    postReducer({
      type: PostActionType.SET_CURRENT_COMMENT,
      payload: []
    });
  }

  postInfo.setCurrentSubcomment = function(commentPayload, subcommentPayload) {
    postReducer({
      type: PostActionType.SET_CURRENT_SUBCOMMENT,
      payload: {
        comment: commentPayload,
        subcomment: subcommentPayload
      },
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

  postInfo.updatePostById = async function (postId, title, tags, content) {
    const response = await api.updatePostById(postId, title, tags, content);
    console.log(response);
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

  postInfo.deleteCommentById = async function (commentId) {
    console.log("delete comment id: ",commentId);
    const response = await api.deleteCommentById(commentId);
    if (response.data.error){
      setPostInfo({
        ...postInfo, 
        errorMessage: response.data.error,
      });
    }else{
      let tempIds = postInfo.currentPost.comments;
      console.log(tempIds);
      const index = tempIds.indexOf(commentId);
      if (index > -1){
        tempIds.splice(index, 1);
      }
      if (tempIds.length > 0) {
        postInfo.getCommentsByCommentIds(tempIds);
      } else {
        postReducer({
          type: PostActionType.UPDATE_ALL_COMMENTS,
          payload: []
        });
      }
    }
  };

  postInfo.deleteSubCommById = async function (subId){
    // delete current subcomment
    const response = await api.deleteSubCommById(subId);
    if(response.status === 200){
      const parentCommentId = postInfo.currentCommentIndex?._id;
      if(!parentCommentId){
        return;
      }

      // obtain new subcomment list
      const subcommentResponse = await api.getSubcommsByParentCommsId(parentCommentId);
      if(subcommentResponse.status === 200){
        const newSubcomments = subcommentResponse.data;

        // reflect this update to allCommentsForPost
        var newAllCommentsForPost = postInfo.allCommentsForPost.slice().map((comment) => {
          if(comment._id === parentCommentId){
            comment.subComments = newSubcomments;
          }
          return comment;
        });

        postReducer({
          type: PostActionType.UPDATE_ALL_COMMENTS,
          payload: newAllCommentsForPost
        });

        return;
      }
    }
    
    // print error if exists
    if (response.data.error){
      setPostInfo({
        ...postInfo, 
        errorMessage: response.data.error,
      });
    }
  }

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
      postReducer({
        type: PostActionType.UPDATE_ALL_COMMENTS,
        payload: []
      });
    }
    else{
      const response = await api.getCommentsByCommentIds(idList);
      postReducer({
        type: PostActionType.UPDATE_ALL_COMMENTS,
        payload: response.data
      });
    }
  };

  postInfo.createSubcomment = async function (
    commentId,
    commenterUserName,
    content
  ) {
    console.log(commentId, commenterUserName, content);
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
