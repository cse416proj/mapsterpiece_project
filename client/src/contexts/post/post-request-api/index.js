import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: 'http://mapsterpiece.online:4000/post',
  // baseURL: "http://localhost:4000/post",
});

export const createPost = (title, tags, content) => {
  return api.post(`/createPost/`, {
    title: title,
    tags: tags,
    content: content,
  });
};

export const getPostsByPostIds = (idList) => {
  return api.get(`/userPosts/${idList}`)
};

export const updatePostById = (postId, title, tags, content) => {
  return api.put(`/updatePost/${postId}`, {
    title: title,
    tags: tags,
    content: content,
  });
};

export const deletePostById = (postId) => {
  return api.delete(`/deletePost/${postId}`)
}

export const createComment = (postId, commenterUserName, content) => {
  return api.post(`/createComment/${postId}`, {
    commenterUserName: commenterUserName,
    content: content,
  });
};

export const getPostById = (postId) => {
  return api.get(`/post/${postId}`);
};

export const getCommentsByCommentIds = (idList) => {
  return api.get(`/postComments/${idList}`);
};

export const createSubcomment = (commentId, commenterUserName, content) => {
  return api.post(`/createSubcomment/${commentId}`, {
    commenterUserName: commenterUserName,
    content: content,
  });
};

export const deleteCommentById =(commentId) => {
  return api.delete(`/deleteComment/${commentId}`);
}

export const deleteSubCommById = (subId)=>{
  return api.delete(`/deleteSubcomment/${subId}`);
}

export const getSubcommsBySubcommsIds = (idList)=>{
  return api.get(`/subComments/${idList}`);
}

const apis = {
  createPost,
  getPostsByPostIds,
  updatePostById,
  deletePostById,
  createComment,
  getPostById,
  getCommentsByCommentIds,
  createSubcomment,
  deleteCommentById,
  deleteSubCommById, 
  getSubcommsBySubcommsIds,
};

export default apis;
