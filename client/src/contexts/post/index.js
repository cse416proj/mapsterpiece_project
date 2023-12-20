import { createContext, useState, useContext } from "react";
import api from "./post-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

export const PostContext = createContext({});

export const PostActionType = {
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_ALL_POSTS_FROM_USER: "SET_ALL_POSTS_FROM_USER",
  SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
  SET_CURRENT_SUBCOMMENT: "SET_CURRENT_SUBCOMMENT",
  UPDATE_ALL_COMMENTS: "UPDATE_ALL_COMMENTS",
  SET_ERROR_MSG: "SET_ERROR_MSG"
};

function PostContextProvider(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [postInfo, setPostInfo] = useState({
    currentPost: null,
    currentCommentIndex: null,
    errorMessage: null,
    allPostsByUser: null,
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
      case PostActionType.SET_ALL_POSTS_FROM_USER: {
        return setPostInfo({
          ...postInfo,
          allPostsByUser: payload,
          errorMessage: null
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
      case PostActionType.SET_ERROR_MSG: {
        return setPostInfo({
          ...postInfo, 
          errorMessage: payload
        });
      }
      default:
        return postInfo;
    }
  };

  postInfo.setErrorMsg = function (msg){
    postReducer({
      type: PostActionType.SET_ERROR_MSG,
      payload: msg,
    });
  }

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
    try{
      const response = await api.createPost(title, tags, content);
      if(response.status === 201){
        console.log(response);
        // close error modal & open create success alert first
        store.createSuccessAlert();
        setPostInfo({
          ...postInfo,
          currentPost: response.data.post,
          errorMessage: null,
        });
        auth.getLoggedIn();
      }
    }
    catch(error){
      store.setError((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error creating post');
    }
  };

  postInfo.updatePostById = async function (postId, title, tags, content) {
    try{
      const response = await api.updatePostById(postId, title, tags, content);
      if(response.status === 201){
        postInfo.setErrorMsg(null);
      }
    }
    catch(error){
      postInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error updating post');
    }
  };

  postInfo.getPostsByPostIds = async function (idList) {
    try{
      const response = await api.getPostsByPostIds(idList);
      setPostInfo({
        ...postInfo,
        allPostsByUser: response.data,
      });
    }
    catch(error){
      postInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error getting posts');
    }
  };

  postInfo.deletePostById = async function (postId) {
    try{
      const response = await api.deletePostById(postId);
      if(response.status === 200){
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
    }
    catch(error){
      postInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error deleting post');
    }
  };

  postInfo.deleteCommentById = async function (commentId) {
    try{
      console.log("delete comment id: ",commentId);
      const response = await api.deleteCommentById(commentId);
    
      if(response.status === 200){
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
    }
    catch(error){
      postInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error deleting post comment');
    }
  };

  postInfo.deleteSubCommById = async function (subId){
    try{
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
        }
      }
    }
    catch(error){
      postInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error deleting post comment');
    }
  }

  postInfo.createComment = async function (postId, commenterUserName, content) {
    try{
      const response = await api.createComment(postId, commenterUserName, content);
      if(response.status === 201){
        postInfo.getPostById(postId);
      }
    }
    catch(error){
      postInfo.setErrorMsg((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error deleting post comment');
    }
  };

  postInfo.getPostById = async function (postId) {
    try{
      const response = await api.getPostById(postId);
      if(response.status === 200){
        setPostInfo({
          ...postInfo,
          currentPost: response.data,
        });
      }
    }
    catch(error){
      postReducer({
        type: PostActionType.SET_ERROR_MSG,
        payload: "Error fetching user's post. Possible reason: non-existing post."
      });
    }
  };

  postInfo.getCommentsByCommentIds = async function (idList) {
    if (idList === undefined || idList.length === 0) {
      postReducer({
        type: PostActionType.UPDATE_ALL_COMMENTS,
        payload: []
      });
    }
    else{
      try{
        const response = await api.getCommentsByCommentIds(idList);
        if(response.status === 200){
          postReducer({
            type: PostActionType.UPDATE_ALL_COMMENTS,
            payload: response.data
          });
        }
      }
      catch(error){
        postReducer({
          type: PostActionType.SET_ERROR_MSG,
          payload: "Error fetching user's post. Possible reason: non-existing post."
        });
      }
    }
  };

  postInfo.createSubcomment = async function (commentId, commenterUserName, content) {
    try{
      console.log(commentId, commenterUserName, content);

      const response = await api.createSubcomment(commentId, commenterUserName, content);
      if(response.status === 201){
        postInfo.getPostById(postInfo.currentPost._id);
      }
    }
    catch(error){
      postReducer({
        type: PostActionType.SET_ERROR_MSG,
        payload: "Error fetching user's post. Possible reason: non-existing post."
      });
    }
  };

  postInfo.setAllPosts = function(posts){
    postReducer({
      type: PostActionType.SET_ALL_POSTS_FROM_USER,
      payload: posts
    });
  }

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
