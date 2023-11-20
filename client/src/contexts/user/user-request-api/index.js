import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({ baseURL: "http://localhost:4000/api-user" });

export const getUserById = (userId) => {
  return api.get(`/user/${userId}`);
};

const apis = {
  getUserById,
};

export default apis;
