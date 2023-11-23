import { server_base_url } from '../../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: `${server_base_url}/api`,
})

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
