import { server_base_url } from '../../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: `${server_base_url}/map`,
})

export const createMap = (ownerUserName, title, fileFormat, mapContent, tags) => {
  return api.post(`/create/`, {
    ownerUserName: ownerUserName,
    title: title,
    fileFormat: fileFormat,
    mapContent: mapContent,
    tags: tags
  });
};

export const deleteMapById = (mapId) => {
  return api.delete(`/delete/${mapId}`)
}

export const getAllUserMaps = () => {
  return api.get(`/allMaps`);
}

export const getMapById = (mapId) =>{
  return api.get(`/get/${mapId}`);
}

export const publishMapById = (mapId) =>{
  return api.put(`/publishMap/${mapId}`);
}

export const unpublishMapById = (mapId) =>{
  return api.put(`/unpublishMap/${mapId}`);
}

export const getAllPublishedMapsFromGivenUser = (userId) =>{
  return api.get(`/allPublicMaps/${userId}`);
}

export const updateMapById = (mapId, map) => {
  return api.put(`/updateMap/${mapId}`, map);
}

export const getAllCommentsFromPublishedMap = (mapId) => {
  return api.get(`/allMapComments/${mapId}`);
}

export const createMapComment = (mapId, commenterUserName, content) => {
  return api.post(`/createMapComment/${mapId}`, {
    commenterUserName: commenterUserName, 
    content: content, 
  })
}

const apis = {
  createMap,
  deleteMapById,
  getAllUserMaps,
  getMapById,
  publishMapById,
  unpublishMapById,
  getAllPublishedMapsFromGivenUser,
  updateMapById, 
  getAllCommentsFromPublishedMap,
  createMapComment,
};

export default apis;