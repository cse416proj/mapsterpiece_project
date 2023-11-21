import axios from "axios";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: "https://mapsterpiece.online/user",
  // baseURL: "http://localhost:4000/user"
});

export const getUserById = (userId) => {
  return api.get(`/user/${userId}`);
};

export const deleteUserById = (userId) => {
  return api.delete(`/deleteUser/${userId}`);
};

const apis = {
  getUserById,
  deleteUserById,
};

export default apis;
