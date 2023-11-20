import { useContext, useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";

import ProfileCard from "./ProfileCard";
import { DynamicCard, DeletePostModal } from "../../index";
import ActionButton from "./ActionButton";
import UserContext from "../../../contexts/user";
import AuthContext from "../../../contexts/auth";
import PostContext from "../../../contexts/post";

function Profile() {
  const { auth } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);
  const { postInfo } = useContext(PostContext);

  const [tab, setTab] = useState("map");

  useEffect(() => {
    if(auth.user && auth.user.posts.length > 0) {
      postInfo.getPostsByPostIds(auth.user.posts);
    }
  }, []);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  if (!userInfo.currentUser) {
    return null;
  }

  function fetchContent() {
    if (tab === "map") {
      return userInfo.currentMaps.map((map, index) => (
        <DynamicCard
          key={`map-${index}`}
          userData={null}
          mapData={map}
          postData={null}
        />
      ));
    } else {
      return postInfo.allPostsByUser?.map((post, index) => (
        <DynamicCard
          key={`post-${index}`}
          userData={null}
          mapData={null}
          postData={post}
        />
      ));
    }
  }

  return (
    <Box className="content" id="user-info-content">
      <Box className="flex-row" id="user-info">
        <Box id="all-maps-posts">
          <Tabs
            className="flex-row"
            id="tab-section"
            onChange={handleChangeTab}
            value={tab}
          >
            <Tab
              id={tab === "map" ? "profile-tab-selected" : "profile-tab"}
              label="All Maps"
              value="map"
            />
            <Tab
              id={tab === "post" ? "profile-tab-selected" : "profile-tab"}
              label="All Posts"
              value="post"
            />
          </Tabs>
          <Box> {fetchContent()} </Box>
        </Box>
        <ProfileCard
          initials={userInfo.getUserInitials().toUpperCase()}
          name={userInfo.getUserFullName()}
          userName={userInfo.getUserName()}
          numMaps={userInfo.getNumMaps()}
          numPosts={userInfo.getNumPosts()}
          isLoggedInUser={
            auth && auth.user !== null && auth.user === userInfo.currentUser
          }
        />
        <DeletePostModal />
      </Box>
      <ActionButton
        isLoggedInUser={
          auth && auth.user !== null && auth.user === userInfo.currentUser
        }
      />
    </Box>
  );
}

export default Profile;
