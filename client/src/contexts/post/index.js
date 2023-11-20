import { createContext, useState, useContext } from "react";
import api from "./post-request-api";
import AuthContext from "../auth";
import GlobalStoreContext from "../store";

export const PostContext = createContext({});

export const PostActionType = {
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_COMMENT: "SET_CURRENT_COMMENT",
  SET_CURRENT_SUBCOMMENT: "SET_CURRENT_SUBCOMMENT",
};

function PostContextProvider(props) {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [postInfo, setPostInfo] = useState({
    currentPost: null,
    currentCommentIndex: null,
    currentSubcommentIndex: null,
    errorMessage: null,
    allPostsByUser: [],
    allCommentsForPost: [],
    allSubcommentsForComment: [],
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
          currentSubcommentIndex: null,
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
          currentSubcommentIndex: payload, 
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

  postInfo.setCurrentSubcomment = function (subcommentPayload) {
    postReducer({
      type: PostActionType.SET_CURRENT_SUBCOMMENT,
      payload: subcommentPayload,
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
        setPostInfo({
          ...postInfo,
          allCommentsForPost: [],
        });
      }
    }
  };

  postInfo.deleteSubCommById = async function (subId){
    console.log("subcomment id for delete: ", subId);
    const response = await api.deleteSubCommById(subId);
    console.log(response.data);
    if (response.data.error){
      setPostInfo({
        ...postInfo, 
        errorMessage: response.data.error,
      });
    }
    else{
      let tempIds = postInfo.currentSubcommentIndex?.subComments;
      console.log(postInfo.currentSubcommentIndex?.subComments);
      const index = tempIds?.indexOf(subId);
      if (index > -1){
        tempIds.splice(index, 1);
      }
      if (tempIds?.length > 0) {
        postInfo.getSubcommsBySubcommsIds(tempIds);
      } else {
        setPostInfo({
          ...postInfo,
          allSubcommentsForComments: [],
        });
      }
    }
  }

  // postInfo.deleteSubCommById = async function (subId) {
  //   try {
  //     console.log("subcomment id for delete: ", subId);
  
  //     const response = await api.deleteSubCommById(subId);
  //     // console.log(response.data.error);
  
  //     if (response.data.error) {
  //       console.log("response err exists");
  //       setPostInfo(prevPostInfo => ({
  //         ...prevPostInfo,
  //         errorMessage: response.data.error,
  //       }));
  //     } else {
  //       console.log(postInfo.currentSubcommentIndex.subComments);
  //       let tempIds = [...postInfo.currentSubcommentIndex.subComments];
  //       console.log(tempIds);
  
  //       const index = tempIds.indexOf(subId);
  //       if (index > -1) {
  //         tempIds.splice(index, 1);
  //       }
  
  //       if (tempIds.length > 0) {
  //         console.log("calling get subcomments by ids", tempIds);
  //         postInfo.getSubcommsBySubcommsIds(tempIds);
  //       } else {
  //         setPostInfo(prevPostInfo => ({
  //           ...prevPostInfo,
  //           allSubcommentsForComments: [],
  //         }));
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error deleting subcomment:", error.message);
  //   }
  // };

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

  postInfo.getSubcommsBySubcommsIds = async function (idList){
    if(idList === undefined || idList.length ===0){
      return setPostInfo({
        ...postInfo, 
        allSubcommentsForComment: [],
      });
    }
    const response = await api.getSubcommsBySubcommsIds(idList);
    setPostInfo({
      ...postInfo, 
      allSubcommentsForComment: response.data
    });
  }

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
