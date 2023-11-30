import { createContext, useState } from "react";
import api from "./store-request-api";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  MARK_CURRENT_SCREEN: "MARK_CURRENT_SCREEN",
  LOAD_ALL_MAPS: "LOAD_ALL_MAPS",
  LOAD_ALL_POSTS: "LOAD_ALL_POSTS",
  LOAD_ALL_USERS: "LOAD_ALL_USERS",
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  HIDE_MODALS: "HIDE_MODALS",
  MARK_POST_FOR_DELETION: "MARK_POST_FOR_DELETION",
  MARK_ACCOUNT_FOR_DELETION: "MARK_ACCOUNT_FOR_DELETION",
  MARK_COMMENT_FOR_DELETION: "MARK_COMMENT_FOR_DELETION",
  MARK_SUBCOMMENT_FOR_DELETION: "MARK_SUBCOMMENT_FOR_DELETION",
  MARK_MAP_FOR_PUBLISH: "MARK_MAP_FOR_PUBLISH",
  UPLOAD_ERROR: "UPLOAD_ERROR",
  SET_DELETE_STATUS: "SET_DELETE_STATUS",
  SET_PUBLISH_STATUS: "SET_PUBLISH_STATUS",
};

const CurrentView = {
  USER_HOME: "USER_HOME",
  CREATE_MAP: "CREATE_MAP",
  CREATE_POST: "CREATE_POST",
  MAP_VIEW: "MAP_VIEW",
  POST_VIEW: "POST_VIEW",

  COMMUNITY: "COMMUNITY",

  ALL_USERS: "ALL_USERS",
  ALL_MAPS: "ALL_MAPS",
  ALL_POSTS: "ALL_POSTS",

  ALL_MAPS_POSTS: "ALL_MAPS_POSTS",
  USER_OWNED_MAPS: "USER_OWNED_MAPS",
  USER_OWNED_POSTS: "USER_OWNED_POSTS",

  BIN_MAPS: "BIN_MAPS",
  CHOROPLETH_MAPS: "CHOROPLETH_MAPS",
  DOT_MAPS: "DOT_MAPS",
  GRAD_MAPS: "GRAD_MAPS",
  HEAT_MAPS: "HEAT_MAPS",

  BIN_POSTS: "BIN_POSTS",
  CHOROPLETH_POSTS: "CHOROPLETH_POSTS",
  DOT_POSTS: "DOT_POSTS",
  GRAD_POSTS: "GRAD_POSTS",
  HEAT_POSTS: "HEAT_POSTS",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_MAP_MODAL: "DELETE_MAP_MODAL",
  DELETE_POST_MODAL: "DELETE_POST_MODAL",
  DELETE_COMMENT_MODAL: "DELETE_COMMENT_MODAL",
  DELETE_ACCOUNT_MODAL: "DELETE_ACCOUNT_MODAL",
  DELETE_SUBCOMMENT_MODAL: "DELETE_SUBCOMMENT_MODAL",
  UPLOAD_ERROR_MODAL: "UPLOAD_ERROR_MODAL",
  PUBLISH_MAP_MODAL: "PUBLISH_MAP_MODAL"
};

function GlobalStoreContextProvider(props) {
  const [store, setStore] = useState({
    deleteSuccess: false,
    publishSuccess: false,

    currentModal: CurrentModal.NONE,
    currentView: CurrentView.USER_HOME,
    allUsers: [],
    allPosts: [],
    allMaps: [],
    allMapsPosts: [],
    // allMapsPosts: fakeAllMapsPosts,

    binMaps: null,
    choroplethMaps: null,
    dotMaps: null,
    gradMaps: null,
    heatMaps: null,

    binPosts: null,
    choroplethPosts: null,
    dotPosts: null,
    gradPosts: null,
    heatPosts: null,

    postMarkedForDeletion: null,
    mapMarked: null,
    accountMarkedForDeletion: null,
    commentMarkedForDeletion: null,
    subcommentMarkedForDeletion: null, 

    errorMsg: ''
  });

  const storeReducer = (action) => {
    const { type, payload } = action;

    /* eslint-disable no-fallthrough */
    switch (type) {
      // placeholder to be replace later on
      case GlobalStoreActionType.LOAD_ALL_MAPS:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          allMaps: payload,
        }));
      case GlobalStoreActionType.LOAD_ALL_POSTS:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          allPosts: payload,
        }));
      case GlobalStoreActionType.LOAD_ALL_USERS:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          allUsers: payload.users,
          allMaps: payload.maps.filter((map) => map.isPublished),
          allPosts: payload.posts
        }));
      case GlobalStoreActionType.MARK_CURRENT_SCREEN:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.NONE,
          currentView: payload,
          mapMarked: null,
          postMarkedForDeletion: null,
          accountMarkedForDeletion: null,
          commentMarkedForDeletion: null,
          subcommentMarkedForDeletion: null,
        }));
      case GlobalStoreActionType.MARK_MAP_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.DELETE_MAP_MODAL,
          mapMarked: payload,
        }));
      case GlobalStoreActionType.MARK_POST_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.DELETE_POST_MODAL,
          postMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_COMMENT_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.DELETE_COMMENT_MODAL,
          commentMarkedForDeletion: payload,
        })); 
      case GlobalStoreActionType.MARK_ACCOUNT_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.DELETE_ACCOUNT_MODAL,
          accountMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_SUBCOMMENT_FOR_DELETION: 
        return setStore((prevStore)=>({
          ...prevStore, 
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.DELETE_SUBCOMMENT_MODAL, 
          subcommentMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_MAP_FOR_PUBLISH:
        console.log(`MARK_MAP_FOR_PUBLISH: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          currentModal: CurrentModal.PUBLISH_MAP_MODAL,
          mapMarked: payload,
        }));
      case GlobalStoreActionType.UPLOAD_ERROR:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.UPLOAD_ERROR_MODAL,
          errorMsg: payload
        }));
      case GlobalStoreActionType.HIDE_MODALS:
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: false,
          publishSuccess: false,
          currentModal: CurrentModal.NONE,
          mapMarked: null,
          postMarkedForDeletion: null,
          accountMarkedForDeletion: null,
          commentMarkedForDeletion: null,
          subcommentMarkedForDeletion: null,
          errorMsg: ''
        }));
      case GlobalStoreActionType.SET_DELETE_STATUS:
        console.log(`SET_DELETE_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: payload,
          currentModal: CurrentModal.NONE,
        }));

      case GlobalStoreActionType.SET_PUBLISH_STATUS:
        console.log(`SET_PUBLISH_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          deleteSuccess: payload,
          currentModal: CurrentModal.NONE,
        }));
      default:
        return store;
    }
  };
  /* eslint-enable no-fallthrough */

  store.setCurrentView = function (screenSelected) {
    storeReducer({
      type: GlobalStoreActionType.MARK_CURRENT_SCREEN,
      payload: screenSelected,
    });
    store.setData();
  };

  store.uploadError = function (errorMsg) {
    storeReducer({
      type: GlobalStoreActionType.UPLOAD_ERROR,
      payload: errorMsg,
    });
  };

  store.closeModal = function () {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
    });
  };

  store.markPostForDeletion = function (postData) {
    storeReducer({
      type: GlobalStoreActionType.MARK_POST_FOR_DELETION,
      payload: postData,
    });
  };

  store.markMapForDeletion = function (mapData) {
    console.log(mapData);
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
      payload: mapData,
    });
  };

  store.markAccountForDeletion = function (accountData) {
    storeReducer({
      type: GlobalStoreActionType.MARK_ACCOUNT_FOR_DELETION,
      payload: accountData,
    });
  }

  store.markCommentForDeletion = function (commentData){
    storeReducer({
      type: GlobalStoreActionType.MARK_COMMENT_FOR_DELETION, 
      payload: commentData,
    });
  };

  store.markSubcommentForDeletion = function (subcommentData){
    storeReducer({
      type: GlobalStoreActionType.MARK_SUBCOMMENT_FOR_DELETION,
      payload: subcommentData,
    });
  }

  store.markMapForPublish = function (mapData) {
    console.log('markMapForPublish');
    console.log(mapData);
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_PUBLISH,
      payload: mapData,
    });
  };

  store.clearDeleteSuccess = function(){
    storeReducer({
      type: GlobalStoreActionType.SET_DELETE_STATUS,
      payload: false
    });
  }

  store.clearPublishSuccess = function(){
    storeReducer({
      type: GlobalStoreActionType.SET_PUBLISH_STATUS,
      payload: false
    });
  }

  store.getData = function (currScreen) {
    const screenDataDict = {
      ALL_USERS: store.allUsers,
      ALL_MAPS: store.allMaps,
      // USER_OWNED_MAPS: store.allMaps,
      ALL_MAPS_POSTS: store.allMapsPosts,
      BIN_MAPS: store.binMaps,
      CHOROPLETH_MAPS: store.choroplethMaps,
      DOT_MAPS: store.dotMaps,
      GRAD_MAPS: store.gradMaps,
      HEAT_MAPS: store.heatMaps,
      ALL_POSTS: store.allPosts,
      // USER_OWNED_POSTS: store.allPosts,
      BIN_POSTS: store.binPosts,
      CHOROPLETH_POSTS: store.choroplethPosts,
      DOT_POSTS: store.dotPosts,
      GRAD_POSTS: store.gradPosts,
      HEAT_POSTS: store.heatPosts,
    };

    console.log(screenDataDict[currScreen]);

    return (currScreen in screenDataDict) ? screenDataDict[currScreen] : null;
  };

  const updateMaps = (allMaps) => ({
    binMaps: allMaps.filter((pair)=>{return pair.tags[0]==="Bin Map"}),
    choroplethMaps: allMaps.filter((pair)=>{return pair.tags[0]==="Choropleth Map"}),
    dotMaps: allMaps.filter((pair)=>{return pair.tags[0]==="Dot Distribution Map"}),
    gradMaps:allMaps.filter((pair)=>{return pair.tags[0]==="Graduated Symbol Map"}),
    heatMaps: allMaps.filter((pair)=>{return pair.tags[0]==="Heat Map"}),
  });
  
  const updatePosts = (allPosts) => ({
    binPosts: allPosts.filter((pair)=>{return pair.tags[0]==="Bin Map"}),
    choroplethPosts: allPosts.filter((pair)=>{return pair.tags[0]==="Choropleth Map"}),
    dotPosts: allPosts.filter((pair)=>{return pair.tags[0]==="Dot Distribution Map"}),
    gradPosts: allPosts.filter((pair)=>{return pair.tags[0]==="Graduated Symbol Map"}),
    heatPosts: allPosts.filter((pair)=>{return pair.tags[0]==="Heat Map"}),
  });

  store.setData = function () {
    setStore((prevStore) => ({
      ...prevStore,
      ...updateMaps(prevStore.allMaps),
      ...updatePosts(prevStore.allPosts),
    }));
  };

  store.getAllPosts = async function () {
    const response = await api.getAllPosts();
    storeReducer({
      type: GlobalStoreActionType.LOAD_ALL_POSTS,
      payload: response.data,
    });
  };

  store.getAllUsers = async function () {
    const response = await api.getAllUsers();

    const userData = response.data;
    if(!userData){
      return;
    }

    let tempAllMaps = [];
    let tempAllPosts = [];

    userData.forEach((user) => {
      user.maps.forEach((map) => {
        tempAllMaps.push(map);
      });

      user.posts.forEach((post) => {
        tempAllPosts.push(post);
      });
    });

    storeReducer({
      type: GlobalStoreActionType.LOAD_ALL_USERS,
      payload: {
        users: userData,
        maps: tempAllMaps,
        posts: tempAllPosts,
      }
    });
  };

  store.getAllMaps = async function () {
    const response = await api.getAllMaps();
    if(response.status === 200){
      storeReducer({
        type: GlobalStoreActionType.LOAD_ALL_MAPS,
        payload: response.data.maps
      });
    }
  };

  // close modal and get all maps after delete
  store.getAllMapsAfterDelete = async function () {
    const response = await api.getAllMaps();
    if(response.status === 200){
      return setStore((prevStore) => ({
        ...prevStore,
        deleteSuccess: true,
        currentModal: CurrentModal.NONE,
        allMaps: response.data.maps,
      }));
    }
  };

  store.closeModalAfterPublish = function(){
    return setStore((prevStore) => ({
      ...prevStore,
      publishSuccess: true,
      currentModal: CurrentModal.NONE,
    }));
  }

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
