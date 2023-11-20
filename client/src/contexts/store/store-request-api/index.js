import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  // baseURL: 'http://mapsterpiece.online:4000/api',
  baseURL: "http://localhost:4000/api",
});

export const getAllPosts = () => {
  return api.get(`/allPosts`)
}

export const getAllUsers = () => {
  return api.get(`/allUsers`)
}

const apis = {
  getAllPosts,
  getAllUsers,
};

export default apis;
