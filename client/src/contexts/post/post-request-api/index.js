import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  // baseURL: 'http://mapsterpiece.online:4000/api-post',
  baseURL: "http://localhost:4000/api-post",
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

const apis = {
  createPost,
  getPostsByPostIds,
  deletePostById,
  createComment,
  getPostById,
  getCommentsByCommentIds,
  createSubcomment,
  deleteCommentById,
};

export default apis;
