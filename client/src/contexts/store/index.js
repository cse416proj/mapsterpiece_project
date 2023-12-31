import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "./store-request-api";
import AuthContext from "../auth";

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
  MARK_MAP_FOR_UNPUBLISH: "MARK_MAP_FOR_UNPUBLISH",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_CREATE_STATUS: "SET_CREATE_STATUS",
  SET_DELETE_STATUS: "SET_DELETE_STATUS",
  SET_PUBLISH_STATUS: "SET_PUBLISH_STATUS",
  SET_UNPUBLISH_STATUS: "SET_UNPUBLISH_STATUS",
  SET_SAVE_STATUS: "SET_SAVE_STATUS",
  MARK_MAP_FOR_DUPLICATE: "MARK_MAP_FOR_DUPLICATE",
  SET_DUPLICATE_STATUS: "SET_DUPLICATE_STATUS",
  MARK_DUPLICATED_MAP: "MARK_DUPLICATED_MAP",
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

  PIN_MAPS: "PIN_MAPS",
  CHOROPLETH_MAPS: "CHOROPLETH_MAPS",
  DOT_MAPS: "DOT_MAPS",
  GRAD_MAPS: "GRAD_MAPS",
  HEAT_MAPS: "HEAT_MAPS",

  PIN_POSTS: "PIN_POSTS",
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
  ERROR_MODAL: "ERROR_MODAL",
  PUBLISH_MAP_MODAL: "PUBLISH_MAP_MODAL",
  UNPUBLISH_MAP_MODAL: "UNPUBLISH_MAP_MODAL",
  DUPLICATE_MAP_MODAL: "DUPLICATE_MAP_MODAL",
};

function GlobalStoreContextProvider(props) {
  const location = useLocation();
  const {auth} = useContext(AuthContext);

  const [store, setStore] = useState({
    createSuccess: true,
    deleteSuccess: false,
    publishSuccess: false,
    unpublishSuccess: false,
    saveSuccess: false,
    duplicateSuccess: false, 

    currentModal: CurrentModal.NONE,
    currentView: CurrentView.USER_HOME,

    allUsers: null,
    allPosts: null,
    allMaps: null,
    allMapsPosts: null,

    pinMaps: null,
    choroplethMaps: null,
    dotMaps: null,
    gradMaps: null,
    heatMaps: null,

    pinPosts: null,
    choroplethPosts: null,
    dotPosts: null,
    gradPosts: null,
    heatPosts: null,

    postMarkedForDeletion: null,
    mapMarked: null,
    accountMarkedForDeletion: null,
    commentMarkedForDeletion: null,
    subcommentMarkedForDeletion: null, 

    errorMsg: null
  });

  const storeReducer = (action) => {
    const { type, payload } = action;

    /* eslint-disable no-fallthrough */
    switch (type) {
      // placeholder to be replace later on
      case GlobalStoreActionType.LOAD_ALL_MAPS:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          allMaps: payload,
        }));
      case GlobalStoreActionType.LOAD_ALL_POSTS:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          allPosts: payload,
        }));
      case GlobalStoreActionType.LOAD_ALL_USERS:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          allUsers: payload.users,
          allMaps: payload.maps?.filter((map) => map.isPublished),
          allPosts: payload.posts
        }));
      case GlobalStoreActionType.MARK_CURRENT_SCREEN:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
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
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.DELETE_MAP_MODAL,
          mapMarked: payload,
        }));
      case GlobalStoreActionType.MARK_POST_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.DELETE_POST_MODAL,
          postMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_COMMENT_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.DELETE_COMMENT_MODAL,
          commentMarkedForDeletion: payload,
        })); 
      case GlobalStoreActionType.MARK_ACCOUNT_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.DELETE_ACCOUNT_MODAL,
          accountMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_SUBCOMMENT_FOR_DELETION: 
        return setStore((prevStore)=>({
          ...prevStore, 
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.DELETE_SUBCOMMENT_MODAL, 
          subcommentMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_MAP_FOR_PUBLISH:
        console.log(`MARK_MAP_FOR_PUBLISH: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.PUBLISH_MAP_MODAL,
          mapMarked: payload,
        }));
      case GlobalStoreActionType.MARK_MAP_FOR_UNPUBLISH:
        console.log(`MARK_MAP_FOR_UNPUBLISH: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.UNPUBLISH_MAP_MODAL,
          mapMarked: payload,
        }));
        case GlobalStoreActionType.MARK_MAP_FOR_DUPLICATE:
        console.log(`MARK_MAP_FOR_DUPLICATE: ${payload}`);
        console.log(payload);
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false,
          currentModal: CurrentModal.DUPLICATE_MAP_MODAL,
          mapMarked: payload,
        }));
      case GlobalStoreActionType.SET_ERROR:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false,
          currentModal: CurrentModal.ERROR_MODAL,
          errorMsg: payload
        }));
      case GlobalStoreActionType.CLEAR_ERROR:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false,
          currentModal: CurrentModal.NONE,
          errorMsg: null
        }));
      case GlobalStoreActionType.HIDE_MODALS:
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.NONE,
          mapMarked: null,
          postMarkedForDeletion: null,
          accountMarkedForDeletion: null,
          commentMarkedForDeletion: null,
          subcommentMarkedForDeletion: null,
          errorMsg: null
        }));
      case GlobalStoreActionType.SET_CREATE_STATUS:
        console.log(`SET_CREATE_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: payload,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.NONE,
        }));
      case GlobalStoreActionType.SET_DELETE_STATUS:
        console.log(`SET_DELETE_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: payload,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.NONE,
        }));
      case GlobalStoreActionType.SET_PUBLISH_STATUS:
        console.log(`SET_PUBLISH_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: payload,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.NONE,
        }));
      case GlobalStoreActionType.SET_UNPUBLISH_STATUS:
        console.log(`SET_UNPUBLISH_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: payload,
          duplicateSuccess: false,
          saveSuccess: false,
          currentModal: CurrentModal.NONE,
        }));
      case GlobalStoreActionType.SET_SAVE_STATUS:
        console.log(`SET_SAVE_STATUS: ${payload}`)
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: false,
          publishSuccess: false,
          unpublishSuccess: false,
          duplicateSuccess: false,
          saveSuccess: payload,
          currentModal: CurrentModal.NONE,
        }));
        case GlobalStoreActionType.SET_DUPLICATE_STATUS:
          console.log(`SET_DUPLICATE_STATUS: ${payload}`)
          return setStore((prevStore) => ({
            ...prevStore,
            createSuccess: false,
            deleteSuccess: false,
            publishSuccess: false,
            unpublishSuccess: false,
            saveSuccess: false,
            duplicateSuccess: payload,
            currentModal: CurrentModal.NONE,
          }));
          case GlobalStoreActionType.MARK_DUPLICATED_MAP:
            console.log(`MARK_DUPLICATED_MAP: ${payload}`);
            console.log(payload);
            return setStore((prevStore) => ({
              ...prevStore,
              createSuccess: false,
              deleteSuccess: false,
              publishSuccess: false,
              unpublishSuccess: false,
              saveSuccess: false,
              duplicateSuccess: false,
              currentModal: CurrentModal.NONE,
              mapMarked: payload,
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

  store.clearError = function () {
    storeReducer({
      type: GlobalStoreActionType.CLEAR_ERROR,
      payload: null
    });
  };

  store.setError = function (errorMsg) {
    storeReducer({
      type: GlobalStoreActionType.SET_ERROR,
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
    console.log('markSubcommentForDeletion');
    console.log(subcommentData);
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

  store.markMapForUnpublish = function (mapData) {
    console.log('markMapForUnpublish');
    console.log(mapData);
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_UNPUBLISH,
      payload: mapData,
    });
  };

  store.clearCreateSuccess = function(){
    storeReducer({
      type: GlobalStoreActionType.SET_CREATE_STATUS,
      payload: false
    });
  }

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

  store.clearUnpublishSuccess = function(){
    storeReducer({
      type: GlobalStoreActionType.SET_UNPUBLISH_STATUS,
      payload: false
    });
  }

  store.clearSaveSuccess = function(){
    storeReducer({
      type: GlobalStoreActionType.SET_SAVE_STATUS,
      payload: false
    });
  }
  
  store.getData = function (currScreen) {
    const  screenDataDict = {
        ALL_USERS: store.allUsers,
        ALL_MAPS: store.allMaps,
        USER_OWNED_MAPS: store.allMaps,
        ALL_MAPS_POSTS: store.allMapsPosts,
        PIN_MAPS: store.pinMaps,
        CHOROPLETH_MAPS: store.choroplethMaps,
        DOT_MAPS: store.dotMaps,
        GRAD_MAPS: store.gradMaps,
        HEAT_MAPS: store.heatMaps,
        ALL_POSTS: store.allPosts,
        USER_OWNED_POSTS: store.allPosts,
        PIN_POSTS: store.pinPosts,
        CHOROPLETH_POSTS: store.choroplethPosts,
        DOT_POSTS: store.dotPosts,
        GRAD_POSTS: store.gradPosts,
        HEAT_POSTS: store.heatPosts,
      };

    // console.log(screenDataDict[currScreen]);
    return (currScreen in screenDataDict) ? screenDataDict[currScreen] : null;
  };

  const updateMaps = (allMaps) =>  ({
    pinMaps: allMaps?.filter((pair)=>{return pair?.mapType?.includes("PINMAP")}),
    choroplethMaps: allMaps?.filter((pair)=>{return pair?.mapType?.includes("CHOROPLETH")}),
    dotMaps: allMaps?.filter((pair)=>{return pair?.mapType?.includes("DOT_DISTRIBUTION")}),
    gradMaps: allMaps?.filter((pair)=>{return pair?.mapType?.includes("GRADUATED_SYMBOL")}),
    heatMaps: allMaps?.filter((pair)=>{return pair?.mapType?.includes("HEATMAP")}),
    });

  const filterPosts = (pair, searchStrings) => {
    const lowerCaseTags = pair?.tags?.map(tag => tag.toLowerCase()) || "";
    const lowerCaseTitle = pair?.title?.toLowerCase() || "";
    const lowerCaseContent = pair?.content?.toLowerCase() || "";
  
    return searchStrings.some(
      searchString =>
        lowerCaseTags.some(tag => tag.toLowerCase().includes(searchString)) ||
        lowerCaseTitle.includes(searchString) ||
        lowerCaseContent.includes(searchString)
    );
  };
  
  const updatePosts = (allPosts) => ({
    pinPosts: allPosts?.filter(pair => filterPosts(pair, ["pin"])),
    choroplethPosts: allPosts?.filter(pair => filterPosts(pair, ["choropleth"])),
    dotPosts: allPosts?.filter(pair => filterPosts(pair, ["dot"])),
    gradPosts: allPosts?.filter(pair => filterPosts(pair, ["graduated"])),
    heatPosts: allPosts?.filter(pair => filterPosts(pair, ["heat"])),
  });  

  store.setData = function () {
    setStore((prevStore) => ({
      ...prevStore,
      ...updateMaps(prevStore.allMaps),
      ...updatePosts(prevStore.allPosts),
    }));
  };

  store.getAllPosts = async function () {
    try{
      const response = await api.getAllPosts();
      storeReducer({
        type: GlobalStoreActionType.LOAD_ALL_POSTS,
        payload: response.data,
      });
    }
    catch(error){
      store.setError((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error getting all posts');
    }
  };

  store.getAllUsers = async function () {
    try{
      const response = await api.getAllUsers();
      if(response.status === 200){
        const userData = response.data;
        if(!userData){
          return;
        }
    
        let tempAllMaps = [];
        let tempAllPosts = [];
    
        for(let i = 0; i < userData.length; i++){
            const user = userData[i];

            console.log(auth);

            if(auth?.user?.userName === user?.userName){
              user?.maps?.forEach((map) => {
                tempAllMaps.push(map);
              });
            }
            else{
              const publishedMaps = user?.maps?.filter((map) => map.isPublished);
              userData[i].maps = publishedMaps;
              
              publishedMaps?.forEach((map) => {
                tempAllMaps.push(map);
              });
            }
      
            user?.posts?.forEach((post) => {
              tempAllPosts.push(post);
            });
        }
    
        storeReducer({
          type: GlobalStoreActionType.LOAD_ALL_USERS,
          payload: {
            users: userData,
            maps: tempAllMaps,
            posts: tempAllPosts,
          }
        });
      }
    }
    catch(error){
      store.setError((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error getting all users');
    }
  };

  store.getAllMaps = async function () {
    try{
      const response = await api.getAllMaps();
      if(response.status === 200){
        storeReducer({
          type: GlobalStoreActionType.LOAD_ALL_MAPS,
          payload: response.data.maps
        });
      }
    }
    catch(error){
      store.setError((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error getting all maps');
    }
  };

  // close modal and get all maps after delete
  store.getAllMapsAfterDelete = async function () {
    try{
      const response = await api.getAllMaps();
      if(response.status === 200){
        return setStore((prevStore) => ({
          ...prevStore,
          createSuccess: false,
          deleteSuccess: true,
          publishSuccess: false,
          unpublishSuccess: false,
          saveSuccess: false,
          duplicateSuccess: false, 
          currentModal: CurrentModal.NONE,
          allMaps: response.data.maps,
        }));
      }
    }
    catch(error){
      store.setError((error?.response?.data?.errorMessage) ? error?.response?.data?.errorMessage : 'Error getting all maps after deletion');
    }
  };

  store.createSuccessAlert = function(){
    return setStore((prevStore) => ({
      ...prevStore,
      createSuccess: true,
      deleteSuccess: false,
      publishSuccess: false,
      unpublishSuccess: false,
      saveSuccess: false,
      currentModal: CurrentModal.NONE,
      errorMsg: null
    }));
  }

  store.closeModalAfterPublish = function(){
    return setStore((prevStore) => ({
      ...prevStore,
      createSuccess: false,
      deleteSuccess: false,
      publishSuccess: true,
      unpublishSuccess: false,
      saveSuccess: false,
      duplicateSuccess: false, 
      currentModal: CurrentModal.NONE,
    }));
  }

  store.closeModalAfterUnpublish = function(){
    return setStore((prevStore) => ({
      ...prevStore,
      createSuccess: false,
      deleteSuccess: false,
      publishSuccess: false,
      unpublishSuccess: true,
      saveSuccess: false,
      currentModal: CurrentModal.NONE,
    }));
  }
  
  store.saveSuccessAlert = function(){
    console.log('store.saveSuccessAlert');
    return setStore((prevStore) => ({
      ...prevStore,
      createSuccess: false,
      deleteSuccess: false,
      publishSuccess: false,
      unpublishSuccess: false,
      saveSuccess: true,
      duplicateSuccess: false, 
      currentModal: CurrentModal.NONE,
      errorMsg: null
    }));
  }

  //getAllMapsPosts from given user
  store.getAllMapsPosts = function(userMaps, userPosts, user){
    // console.log(user?.userName, auth?.user?.userName);
    // console.log(typeof userMaps[0], typeof userPosts[0]);
    if(typeof userMaps[0] !=='string' && typeof userPosts[0] !=='string'){
      let tmpMaps = [];
      if(!auth?.user || !auth?.user?.userName || auth?.user?.userName !== user?.userName){
        tmpMaps = userMaps?.filter((pair)=>{return pair.isPublished});
      }else{
        tmpMaps = userMaps;
      }

      const Maps = tmpMaps;
      const Posts = userPosts;
      const userMapsNPosts = [...Maps, ...Posts];

      setStore((prevStore) => ({
        ...prevStore,
        allMaps: Maps,
        allPosts: Posts,
        allMapsPosts: userMapsNPosts,
      }));

      if(!store.currentView.includes('search')){
        store.setData();
      }
    }
  }

  store.markMapForDuplicate = function(mapData){
    console.log("map for duplicate: ", mapData);
    storeReducer({
      type: GlobalStoreActionType.MARK_MAP_FOR_DUPLICATE,
      payload: mapData,
    });
  }

  store.closeModalAfterDuplicate = function(){
    return setStore((prevStore) => ({
      ...prevStore,
      createSuccess: false,
      deleteSuccess: false,
      publishSuccess: false,
      unpublishSuccess: false,
      saveSuccess: false,
      duplicateSuccess: true,
      currentModal: CurrentModal.NONE,
    }));
  }

  store.clearDuplicateSuccess = function(){
    storeReducer({
      type: GlobalStoreActionType.SET_DUPLICATE_STATUS,
      payload: false
    });
  }

  store.markDuplicatedMap = function(mapData){
    storeReducer({
      type: GlobalStoreActionType.MARK_DUPLICATED_MAP,
      payload: mapData,
    });
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
