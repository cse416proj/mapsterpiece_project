import { useContext, useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useParams } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import { DynamicCard, DeletePostModal, DeleteMapModal, PublishMapModal, UnpublishMapModal, DuplicateMapModal } from "../../index";
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

  const { userId } = useParams();
  const [tab, setTab] = useState("map");

  useEffect(() => {
    userInfo.getUserById(userId);
  }, [userId]);

  useEffect(() => {
    // only load other user's publish map
    if(userInfo.currentUser){
      if(auth && auth.user && auth.user._id === userInfo.currentUser._id){
        mapInfo.getMapsByMapIds(auth.user.maps);
      }
      else{
        async function loadUserMapInfo(userId){
          await mapInfo.getAllPublishedMapsFromGivenUser(userId);
        }
        loadUserMapInfo(userInfo.currentUser._id);
      }
    }
  }, [userInfo.currentUser]);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  if (!userInfo.currentUser) {
    return null;
  }

  function fetchContent() {
    if (tab === "map") {
      if(mapInfo && mapInfo.allMapsByUser){
        return mapInfo.allMapsByUser?.map((map, index) => (
          <DynamicCard
            key={`map-${index}`}
            userData={null}
            mapData={map}
            postData={null}
          />
        ));
      }
    } else {
      if(postInfo && postInfo.allPostsByUser){
        return userInfo.currentUser?.posts?.map((post, index) => (
          <DynamicCard
            key={`post-${index}`}
            userData={null}
            mapData={null}
            postData={post}
          />
        ));
      }
    }
  }

  const isLoggedInUser = (auth && auth.user !== null && auth.user.userName === userInfo.currentUser.userName);

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
          <Box id='profile-cards'>
            {fetchContent()}
          </Box>
        </Box>
        <ProfileCard
          initials={userInfo.getUserInitials().toUpperCase()}
          name={userInfo.getUserFullName()}
          userName={userInfo.getUserName()}
          numMaps={mapInfo && mapInfo.allMapsByUser && mapInfo.allMapsByUser.length}
          numPosts={userInfo && userInfo.currentUser && userInfo.currentUser?.posts.length}
          isLoggedInUser={isLoggedInUser}
        />
        <DeletePostModal/>
        <DeleteMapModal/>
        <PublishMapModal/>
        <UnpublishMapModal/>
        <DuplicateMapModal/>
      </Box>
      <ActionButton isLoggedInUser={isLoggedInUser}/>
    </Box>
  );
}

export default Profile;