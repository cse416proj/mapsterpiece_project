import { createContext, useState } from "react";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  MARK_CURRENT_SCREEN: "MARK_CURRENT_SCREEN",
  LOAD_ALL_MAPS: "LOAD_ALL_MAPS",
  LOAD_ALL_POSTS: "LOAD_ALL_POSTS",
  LOAD_ALL_USERS: "LOAD_ALL_USERS",
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
  HIDE_MODALS: "HIDE_MODALS",
  MARK_POST_FOR_DELETION:"MARK_POST_FOR_DELETION",
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
  ALL_MAP_POSTS: "ALL_MAP_POSTS",
  USER_OWNED_MAPS: "USER_OWNED_MAPS",
  USER_OWNED_POSTS: "USER_OWNED_POSTS",

  BIN_MAPS:"BIN_MAPS",
  CHOROPLETH_MAPS: "CHOROPLETH_MAPS",
  DOT_MAPS: "DOT_MAPS",
  GRAD_MAPS: "GRAD_MAPS", 
  HEAT_MAPS: "HEAT_MAPS",
  
  BIN_POSTS:"BIN_POSTS",
  CHOROPLETH_POSTS: "CHOROPLETH_POSTS",
  DOT_POSTS: "DOT_POSTS",
  GRAD_POSTS: "GRAD_POSTS", 
  HEAT_POSTS: "HEAT_POSTS",
};

const CurrentModal = {
  NONE: "NONE",
  DELETE_POST_MODAL: "DELETE_POST_MODAL",
}

// hardcoded data to be replaced later on with actual data
const fakeAllUsers = [
  {
    _id: {
      $oid: "6547ea560946232834874dd4",
    },
    firstName: "ur",
    lastName: "mom",
    userName: "urmom",
    email: "urmom@gmail.com",
    passwordHash:
      "$2a$10$V2g5TgHvnxj3C9zQEgAP5OcREuflnhC/jVyGzhkMMqz0XFTTdsE/a",
    createdAt: {
      $date: "2023-11-05T19:17:42.514Z",
    },
    updatedAt: {
      $date: "2023-11-05T19:17:42.514Z",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "65482b5e0946232834874e6c",
    },
    firstName: "hi",
    lastName: "hi",
    userName: "hihi",
    email: "hi@gmail.com",
    passwordHash:
      "$2a$10$YRW9JZHgOzaobTx1U9kl/e3st67LEx0I0bKPHRIkgGCQKH7L.HljG",
    createdAt: {
      $date: "2023-11-05T23:55:10.885Z",
    },
    updatedAt: {
      $date: "2023-11-05T23:55:10.885Z",
    },
    __v: 0,
  },
];

const fakeAllPosts = [
  {
    _id: {
      $oid: "6579ea560946232834874dd4",
    },
    ownerUserName: "urmomUser",
    title: "blablabla",
    tags: ["Dot Distribution Map", "tag2"],
    postBody:
      "Good morning SWEETIE Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Good morning SWEETIE Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Good morning SWEETIE Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
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
      $oid: "6550ea560946232834874dd4",
    },
    ownerUserName: "NOTurmomUser",
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
      $oid: "6580ea560946232834874dd4",
    },
    ownerUserName: "SFkkk",
    title: "MAAAAAp",
    tags: ["Graduated Symbol Map", "tag2"],
    postBody:
      "BYE BRO Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
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

const fakeAllMaps = [
  {
    _id: {
      $oid: "6547ea560946232834874dd4",
    },
    ownerUserName: "AmaPuser",
    title: "some map title",
    fileFormat:"GeoJSON",
    // mapType: schema.types.mixed,
    // map: map object
    tags: ["Bin Map", "Europe", "Population"],  // 1st tag should be the string of map type
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
    ownerUserName: "GabbyDu",
    title: "some map title 2",
    fileFormat:"Shapefile",
    mapType: "Heat Map",    // schema.types.mixed?
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

const binMaps = fakeAllMaps.filter((pair)=>{return pair.tags[0]==="Bin Map"});
const choroplethMaps= fakeAllMaps.filter((pair)=>{return pair.tags[0]==="Choropleth Map"});
const dotMaps= fakeAllMaps.filter((pair)=>{return pair.tags[0]==="Dot Distribution Map"});
const gradMaps= fakeAllMaps.filter((pair)=>{return pair.tags[0]==="Graduated Symbol Map"});
const heatMaps= fakeAllMaps.filter((pair)=>{return pair.tags[0]==="Heat Map"});

const binPosts= fakeAllPosts.filter((pair)=>{return pair.tags[0]==="Bin Map"});
const choroplethPosts= fakeAllPosts.filter((pair)=>{return pair.tags[0]==="Choropleth Map"});
const dotPosts= fakeAllPosts.filter((pair)=>{return pair.tags[0]==="Dot Distribution Map"});
const gradPosts= fakeAllPosts.filter((pair)=>{return pair.tags[0]==="Graduated Symbol Map"});
const heatPosts= fakeAllPosts.filter((pair)=>{return pair.tags[0]==="Heat Map"});

function GlobalStoreContextProvider(props) {
  const [store, setStore] = useState({
    currentModal : CurrentModal.NONE,
    currentView: CurrentView.USER_HOME,
    allUsers: fakeAllUsers,
    allPosts: fakeAllPosts,
    allMaps: fakeAllMaps,

    binMaps: binMaps,
    choroplethMaps: choroplethMaps, 
    dotMaps: dotMaps,
    gradMaps: gradMaps,
    heatMaps: heatMaps, 

    binPosts: binPosts,
    choroplethPosts: choroplethPosts, 
    dotPosts: dotPosts,
    gradPosts: gradPosts,
    heatPosts: heatPosts, 

    postMarkedForDeletion: null,
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    console.log(type);
    switch (type) {
      // placeholder to be replace later on
      case GlobalStoreActionType.LOAD_ALL_MAPS: {
        return setStore({
          currentModal : CurrentModal.NONE,
          currentView: CurrentView.USER_HOME,
          allUsers: [],
          allPosts: [],
          allMaps: [],

          binMaps: [],
          choroplethMaps: [], 
          dotMaps: [],
          gradMaps: [],
          heatMaps: [], 

          binPosts: [],
          choroplethPosts: [], 
          dotPosts: [],
          gradPosts: [],
          heatPosts: [], 

          postMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.MARK_CURRENT_SCREEN: {
        return setStore({
          currentModal : CurrentModal.NONE,
          currentView: payload,
          allUsers: store.allUsers,
          allPosts: store.allPosts,
          allMaps: store.allMaps,

          binMaps: store.binMaps,
          choroplethMaps: store.choroplethMaps, 
          dotMaps: store.dotMaps,
          gradMaps: store.gradMaps,
          heatMaps: store.heatMaps, 

          binPosts: store.binPosts,
          choroplethPosts: store.choroplethPosts, 
          dotPosts: store.dotPosts,
          gradPosts: store.gradPosts,
          heatPosts: store.heatPosts, 

          postMarkedForDeletion: null,
        });
      }
      case GlobalStoreActionType.MARK_POST_FOR_DELETION: {
        return setStore({
          currentModal : CurrentModal.DELETE_POST_MODAL,
          currentView: store.currentView,
          allUsers: store.allUsers,
          allPosts: store.allPosts,
          allMaps: store.allMaps,

          binMaps: store.binMaps,
          choroplethMaps: store.choroplethMaps, 
          dotMaps: store.dotMaps,
          gradMaps: store.gradMaps,
          heatMaps: store.heatMaps, 

          binPosts: store.binPosts,
          choroplethPosts: store.choroplethPosts, 
          dotPosts: store.dotPosts,
          gradPosts: store.gradPosts,
          heatPosts: store.heatPosts, 

          postMarkedForDeletion: payload[0],   // temp setup 
        })
      }

      case GlobalStoreActionType.HIDE_MODALS: {
        return setStore({
          currentModal : CurrentModal.NONE,
          currentView: store.currentView,
          allUsers: store.allUsers,
          allPosts: store.allPosts,
          allMaps: store.allMaps,

          binMaps: store.binMaps,
          choroplethMaps: store.choroplethMaps, 
          dotMaps: store.dotMaps,
          gradMaps: store.gradMaps,
          heatMaps: store.heatMaps, 

          binPosts: store.binPosts,
          choroplethPosts: store.choroplethPosts, 
          dotPosts: store.dotPosts,
          gradPosts: store.gradPosts,
          heatPosts: store.heatPosts, 

          postMarkedForDeletion: null,
        })
      }
      
      default:
        return store;
    }
  };

  store.setCurrentView = function (screenSelected) {
    storeReducer({
      type: GlobalStoreActionType.MARK_CURRENT_SCREEN,
      payload: screenSelected,
    });
  };

  store.closeModal = function(){
    storeReducer({
        type: GlobalStoreActionType.HIDE_MODALS,
        payload: {}
    });    
  }

  // need modification
  store.markPostForDeletion = function(){
    console.log(fakeAllPosts);
    storeReducer({
      type: GlobalStoreActionType.MARK_POST_FOR_DELETION,
      payload: {fakeAllPosts},    // tmp setup to reveal post delete modal
  }); 
  }

  // store.deleteMarkedPost = function(){}

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
