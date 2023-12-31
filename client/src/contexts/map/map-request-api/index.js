import { server_base_url } from '../../../config';

import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: `${server_base_url}/map`,
})

export const createMap = (ownerUserName, title, fileFormat, mapType, mapContent, tags) => {
  return api.post(`/create/`, {
    ownerUserName: ownerUserName,
    title: title,
    fileFormat: fileFormat,
    mapType: mapType,
    mapContent: mapContent,
    tags: tags
  });
};

export const deleteMapById = (mapId) => {
  return api.delete(`/delete/${mapId}`)
}

// export const getAllUserMaps = () => {
//   return api.get(`/allMaps`);
// }

export const getMapById = (mapId) =>{
  return api.get(`/get/${mapId}`);
}

export const getMapsByMapIds = (idList) => {
  return api.get(`/userMaps/${idList}`)
};

export const publishMapById = (mapId, map) =>{
  return api.put(`/publishMap/${mapId}`, map);
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

export const likeDislikeMapById = (mapId, isLike) => {
  return api.put(`/likeDislikeMap/${mapId}`, {
    isLike: isLike
  });
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

export const createSubcomment = (commentId, commenterUserName, content) => {
  return api.post(`/createSubcomment/${commentId}`, {
    commenterUserName: commenterUserName,
    content: content,
  });
};

export const deleteCommentById =(commentId) => {
  return api.delete(`/deleteMapComment/${commentId}`);
}

export const deleteSubCommentById = (subcommentId) => {
  return api.delete(`/deleteMapSubcomment/${subcommentId}`);
}

export const getSubcommsByParentCommsId = (commentId) => {
  return api.get(`/getSubComments/${commentId}`);
}

export const duplicateMapById = (mapId, title)=>{
  return api.post(`/duplicate/${mapId}`, {
    title: title,
  });
}

const apis = {
  createMap,
  deleteMapById,
  // getAllUserMaps,
  getMapById,
  getMapsByMapIds,
  publishMapById,
  unpublishMapById,
  getAllPublishedMapsFromGivenUser,
  updateMapById, 
  getAllCommentsFromPublishedMap,
  createMapComment,
  likeDislikeMapById,
  createSubcomment,
  deleteCommentById,
  deleteSubCommentById,
  getSubcommsByParentCommsId,
  duplicateMapById
};

export default apis;