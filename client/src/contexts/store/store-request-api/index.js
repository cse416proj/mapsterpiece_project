import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  // baseURL: 'https://mapsterpiece.online/api',
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
