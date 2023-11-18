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

const apis = {
  createPost,
};

export default apis;
