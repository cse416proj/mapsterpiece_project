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

export const getAllMaps = () => {
  return api.get(`/allMaps`)
}

const apis = {
  getAllPosts,
  getAllUsers,
  getAllMaps
};

export default apis;
