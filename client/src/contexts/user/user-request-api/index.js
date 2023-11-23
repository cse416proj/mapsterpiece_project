import { server_base_url } from '../../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: `${server_base_url}/user`,
})

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
