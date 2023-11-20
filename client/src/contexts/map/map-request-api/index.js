import axios from 'axios';
axios.defaults.withCredentials = true;

const api = axios.create({
  // baseURL: 'http://mapsterpiece.online:4000/map',
    baseURL: 'http://localhost:4000/map',
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

const apis = {
  createMap,
  deleteMapById
};

export default apis;