import { useContext, useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import { DynamicCard, DeletePostModal } from "../../index";
import ActionButton from "./ActionButton";
import UserContext from "../../../contexts/user";
import AuthContext from "../../../contexts/auth";
import PostContext from "../../../contexts/post";
import MapContext from "../../../contexts/map";

function Profile() {
  const { auth } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);
  const { postInfo } = useContext(PostContext);
  const { mapInfo } = useContext(MapContext);

  const [tab, setTab] = useState("map");

  const { userId } = useParams();

  useEffect(() => {
    if (auth?.user?.posts?.length > 0) {
      postInfo.getPostsByPostIds(auth.user.posts);
    }
    userInfo.getUserById(userId);
  }, []);

  useEffect(() => {
      mapInfo.getAllUserMaps();
  }, []);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  if (!userInfo.currentUser) {
    return null;
  }

  function fetchContent() {
    if (tab === "map") {
      return mapInfo.allMapsFromUser?.map((map, index) => (
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
              label="Create Map"
              value="map"
            />
            <Tab
              id={tab === "post" ? "profile-tab-selected" : "profile-tab"}
              label="Create Post"
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
