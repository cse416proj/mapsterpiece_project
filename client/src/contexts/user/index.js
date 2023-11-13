import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export const UserActionType = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// hardcode values
const maps = [
  {
    _id: {
      $oid: "6547ea560946232834874dd4",
    },
    ownerUserName: "joeshmo",
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
    ownerUserName: "joeshmo",
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

const posts = [
  {
    _id: {
      $oid: "6579ea560946232834874dd4",
    },
    ownerUserName: "joeshmo",
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
      $oid: "6580ea560946232834874dd4",
    },
    ownerUserName: "joeshmo",
    title: "This is not a map",
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
// end of hardcode values

function UserContextProvider(props) {
  const [userInfo, setUserInfo] = useState({
    currentUser: null,
    currentMaps: maps,
    currentPosts: posts
  });

  // to be removed: print when userInfo update
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo])

  const userReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
        case UserActionType.SET_CURRENT_USER: {
          console.log(payload);
          return setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              currentUser: payload
          }));
        }
      default:
        return userInfo;
    }
  };

  userInfo.setCurrentUser = function(user){
    console.log(user);

    userReducer({
      type: UserActionType.SET_CURRENT_USER,
      payload: user,
    });
  };

  userInfo.getUserInitials = function(){
    let initials = "";
    if(userInfo.currentUser){
      initials += userInfo.currentUser.firstName.charAt(0);
      initials += userInfo.currentUser.lastName.charAt(0);
    }
    return initials;
  }

  userInfo.getUserFullName = function(){
    return `${userInfo.currentUser.firstName} ${userInfo.currentUser.lastName}`;
  }

  userInfo.getUserName = function(){
    return `@${userInfo.currentUser.userName}`;
  }

  userInfo.getNumMaps = function(){
    return `${userInfo.currentMaps.length} maps`;
  }

  userInfo.getNumPosts = function(){
    return `${userInfo.currentPosts.length} posts`;
  }

  return (
    <UserContext.Provider value={{ userInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };