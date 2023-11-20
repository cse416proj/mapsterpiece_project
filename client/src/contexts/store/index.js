import { createContext, useState, useContext, useEffect } from "react";
import PostContext from "../post";
import api from "./store-request-api";
import { Global } from "@emotion/react";

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
};

const CurrentView = {
  USER_HOME: "USER_HOME",
  CREATE_MAP: "CREATE_MAP",
  CREATE_POST: "CREATE_POST",
  MAP_VIEW: "MAP_VIEW",
  POST_VIEW: "POST_VIEW",
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
};

const fakeAllMaps = [
  {
    _id: {
      $oid: "655af7ba5d91a496b38f4e91",
    },
    ownerUserName: "peach23333",
    title: "some map title",
    fileFormat: "GeoJSON",
    isPublished: false,
    // mapType: schema.types.mixed,
    // map: map object
    tags: ["Bin Map", "Europe", "Population"], // 1st tag should be the string of map type
    comments: [
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 1",
        dateCommented: "2023-11-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-11-05T19:17:42.514Z",
          },
        ],
      },
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 2",
        dateCommented: "2023-12-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-12-06T19:17:42.514Z",
          },
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-12-07T19:17:42.514Z",
          },
        ],
      },
    ],
    datePublished: {
      $date: "2023-11-05T19:17:42.514Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "655a752f0926b31495c2c4c4",
    },
    ownerUserName: "apple",
    title: "some map title 2",
    fileFormat: "Shapefile",
    isPublished: true,
    mapType: "Heat Map", // schema.types.mixed?
    // map: map object
    tags: ["Heat Map", "Asia", "Population"],
    comments: [
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 1",
        dateCommented: "2023-11-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-11-05T19:17:42.514Z",
          },
        ],
      },
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 2",
        dateCommented: "2023-12-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-12-06T19:17:42.514Z",
          },
        ],
      },
    ],
    datePublished: {
      $date: "2023-12-05T19:17:42.514Z",
    },
    __v: 0,
  },
];

const fakeAllMapsPosts = [
  {
    _id: {
      $oid: "6550ea560946232834874dd4",
    },
    ownerUserName: "joeshmo",
    title: "this is a post",
    tags: ["Choropleth Map", "tag2"],
    postBody:
      "hello there Lorem ipsum dolor sit amet, coem ipsum dolor sit amet, consedolor sit amet, consectetu nsedolor sit amet, consectetur adipiscing elit, sctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nost exercitation ullamcem ipsum dolor sit amet, rud exercitation ullamcem ipsum dolor sit amet, consedolor sit amet, consectetu o laboris nisi ut aliquip ex ea commodo consequat",
    likedUsers: [],
    dislikedUsers: [],
    comments: [
      {
        commentUserName: "dummyCommentUser",
        text: "dummy comment body",
        dateCommented: "2023-11-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-11-05T19:17:42.514Z",
          },
        ],
      },
    ],
    datePosted: {
      $date: "2023-11-05T19:17:42.514Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "6547ea560946232834874dd4",
    },
    ownerUserName: "joeshmo",
    title: "some map title",
    fileFormat: "GeoJSON",
    // mapType: schema.types.mixed,
    // map: map object
    tags: ["Bin Map", "Europe", "Population"], // 1st tag should be the string of map type
    comments: [
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 1",
        dateCommented: "2023-11-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-11-05T19:17:42.514Z",
          },
        ],
      },
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 2",
        dateCommented: "2023-12-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-12-06T19:17:42.514Z",
          },
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-12-07T19:17:42.514Z",
          },
        ],
      },
    ],
    datePublished: {
      $date: "2023-11-05T19:17:42.514Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "65482b5e0946232834874e6c",
    },
    ownerUserName: "joeshmo",
    title: "some map title 2",
    fileFormat: "Shapefile",
    mapType: "Heat Map", // schema.types.mixed?
    // map: map object
    tags: ["Heat Map", "Asia", "Population"],
    comments: [
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 1",
        dateCommented: "2023-11-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-11-05T19:17:42.514Z",
          },
        ],
      },
      {
        commentUserName: "dummy comment user",
        text: "dummy comment body 2",
        dateCommented: "2023-12-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-12-06T19:17:42.514Z",
          },
        ],
      },
    ],
    datePublished: {
      $date: "2023-12-05T19:17:42.514Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "6580ea560946232834874dd4",
    },
    ownerUserName: "joeshmo",
    title: "MAAAAAp",
    tags: ["Graduated Symbol Map", "tag2"],
    postBody:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    likedUsers: [],
    dislikedUsers: [],
    comments: [
      {
        commentUserName: "dummyCommentUser",
        text: "dummy comment body",
        dateCommented: "2023-11-05T19:17:42.514Z",
        subComments: [
          {
            commentUserName: "subcomment user",
            text: "dummy subcomment body",
            dateCommented: "2023-11-05T19:17:42.514Z",
          },
        ],
      },
    ],
    datePosted: {
      $date: "2023-11-05T19:17:42.514Z",
    },
    __v: 0,
  },
];

function GlobalStoreContextProvider(props) {
  const { postInfo } = useContext(PostContext);

  const [store, setStore] = useState({
    currentModal: CurrentModal.NONE,
    currentView: CurrentView.USER_HOME,
    allUsers: [],
    allPosts: [],
    allMaps: fakeAllMaps,
    allMapsPosts: fakeAllMapsPosts,

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
    mapMarkedForDeletion: null,
    accountMarkedForDeletion: null,
    commentMarkedForDeletion: null,
    subcommentMarkedForDeletion: null, 
  });

  const storeReducer = (action) => {
    const { type, payload } = action;

    /* eslint-disable no-fallthrough */
    switch (type) {
      // placeholder to be replace later on
      case GlobalStoreActionType.LOAD_ALL_MAPS:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.NONE,
          currentView: CurrentView.USER_HOME,
          commentMarkedForDeletion: null,
          subcommentMarkedForDeletion: null, 
        }));
      case GlobalStoreActionType.LOAD_ALL_POSTS:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.NONE,
          currentView: CurrentView.ALL_POSTS,
          allPosts: payload,
        }));
      case GlobalStoreActionType.MARK_CURRENT_SCREEN:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.NONE,
          currentView: payload,
          mapMarkedForDeletion: null,
          postMarkedForDeletion: null,
          accountMarkedForDeletion: null,
          commentMarkedForDeletion: null,
          subcommentMarkedForDeletion: null,
        }));
      case GlobalStoreActionType.MARK_MAP_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.DELETE_MAP_MODAL,
          mapMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_POST_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.DELETE_POST_MODAL,
          postMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_COMMENT_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.DELETE_COMMENT_MODAL,
          commentMarkedForDeletion: payload,
        })); 
      case GlobalStoreActionType.MARK_ACCOUNT_FOR_DELETION:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.DELETE_ACCOUNT_MODAL,
          accountMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.MARK_SUBCOMMENT_FOR_DELETION: 
      console.log("call global store action type");
        return setStore((prevStore)=>({
          ...prevStore, 
          currentModal: CurrentModal.DELETE_SUBCOMMENT_MODAL, 
          subcommentMarkedForDeletion: payload,
        }));
      case GlobalStoreActionType.HIDE_MODALS:
        return setStore((prevStore) => ({
          ...prevStore,
          currentModal: CurrentModal.NONE,
          mapMarkedForDeletion: null,
          postMarkedForDeletion: null,
          accountMarkedForDeletion: null,
          commentMarkedForDeletion: null,
          subcommentMarkedForDeletion: null,
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

  store.closeModal = function () {
    storeReducer({
      type: GlobalStoreActionType.HIDE_MODALS,
      payload: {},
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
    console.log(subcommentData);
    storeReducer({
      type: GlobalStoreActionType.MARK_SUBCOMMENT_FOR_DELETION,
      payload: subcommentData,
    });
  }

  store.getData = function (currScreen) {
    const screenDataDict = {
      ALL_USERS: store.allUsers,
      ALL_MAPS: store.allMaps,
      ALL_MAPS_POSTS: store.allMapsPosts,
      BIN_MAPS: store.binMaps,
      CHOROPLETH_MAPS: store.choroplethMaps,
      DOT_MAPS: store.dotMaps,
      GRAD_MAPS: store.gradMaps,
      HEAT_MAPS: store.heatMaps,
      ALL_POSTS: store.allPosts,
      BIN_POSTS: store.binPosts,
      CHOROPLETH_POSTS: store.choroplethPosts,
      DOT_POSTS: store.dotPosts,
      GRAD_POSTS: store.gradPosts,
      HEAT_POSTS: store.heatPosts,
    };
    return currScreen in screenDataDict ? screenDataDict[currScreen] : null;
  };

  const updateMaps = (allMaps) => ({
    binMaps: store.allMaps.filter((pair)=>{return pair.tags[0]==="Bin Map"}),
    choroplethMaps: store.allMaps.filter((pair)=>{return pair.tags[0]==="Choropleth Map"}),
    dotMaps: store.allMaps.filter((pair)=>{return pair.tags[0]==="Dot Distribution Map"}),
    gradMaps:store.allMaps.filter((pair)=>{return pair.tags[0]==="Graduated Symbol Map"}),
    heatMaps: store.allMaps.filter((pair)=>{return pair.tags[0]==="Heat Map"}),
  });
  
  const updatePosts = (allPosts) => ({
    binPosts: store.allPosts.filter((pair)=>{return pair.tags[0]==="Bin Map"}),
    choroplethPosts: store.allPosts.filter((pair)=>{return pair.tags[0]==="Choropleth Map"}),
    dotPosts: store.allPosts.filter((pair)=>{return pair.tags[0]==="Dot Distribution Map"}),
    gradPosts: store.allPosts.filter((pair)=>{return pair.tags[0]==="Graduated Symbol Map"}),
    heatPosts: store.allPosts.filter((pair)=>{return pair.tags[0]==="Heat Map"}),
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
    let tempAllPosts = [];
    response.data.forEach((user) => {
      user.posts.forEach((post) => {
        tempAllPosts.push(post);
      });
    });
    setStore({
      ...store,
      allUsers: response.data,
      allPosts: tempAllPosts,
    });
  };

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
