import { createContext, useState } from "react";

export const GlobalStoreContext = createContext({});

export const GlobalStoreActionType = {
  MARK_CURRENT_SCREEN: "MARK_CURRENT_SCREEN",
  LOAD_ALL_MAPS: "LOAD_ALL_MAPS",
  LOAD_ALL_POSTS: "LOAD_ALL_POSTS",
  LOAD_ALL_USERS: "LOAD_ALL_USERS",
  SET_CURRENT_POST: "SET_CURRENT_POST",
  SET_CURRENT_MAP: "SET_CURRENT_MAP",
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
};

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
      "Good morning SWEETIE Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
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
      "hello there Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
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

function GlobalStoreContextProvider(props) {
  const [store, setStore] = useState({
    currentView: CurrentView.USER_HOME,
    allUsers: fakeAllUsers,
    allPosts: fakeAllPosts,
    allMaps: fakeAllMaps,
  });

  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // placeholder to be replace later on
      case GlobalStoreActionType.LOAD_ALL_MAPS: {
        return setStore({
          currentView: CurrentView.USER_HOME,
          allUsers: [],
          allPosts: [],
          allMaps: [],
        });
      }
      case GlobalStoreActionType.MARK_CURRENT_SCREEN: {
        return setStore({
          currentView: payload,
          allUsers: store.allUsers,
          allPosts: store.allPosts,
          allMaps: store.allMaps,
        });
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
