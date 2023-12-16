import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box, Tabs, Tab, Typography } from "@mui/material";
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

import ProfileCard from "./ProfileCard";
import ActionButton from "./ActionButton";
import { DynamicCard, Modals } from "../../index";

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

  const isLoggedInUser = (auth && auth.user !== null && auth.user.userName === userInfo?.currentUser?.userName);

  // fetch user info based on id
  useEffect(() => {
    userInfo.getUserById(userId);
  }, [userId]);

  // only load other user's publish map
  useEffect(() => {
    if(!isLoggedInUser && userId){
      async function loadUserMapInfo(userId){
        await mapInfo.getAllPublishedMapsFromGivenUser(userId);
      }
      loadUserMapInfo(userId);
    }
  }, [userInfo?.currentUser]);

  // update curr user maps when we are viewing auth user's profile and auth maps updates
  useEffect(() => {
    if(isLoggedInUser) {
      if(userInfo?.currentUser?.maps?.length !== auth?.user?.maps?.length){
        const updatedMaps = userInfo.currentUser.maps.filter((map) => auth.user.maps.includes(map._id));
        userInfo.updateMaps(updatedMaps);
      }
    }
  }, [auth?.user?.maps]);

  // update curr user posts when we are viewing auth user's profile and auth posts updates
  useEffect(() => {
    if(isLoggedInUser) {
      if(userInfo?.currentUser?.posts?.length !== auth?.user?.posts?.length){
        const updatedPosts = userInfo.currentUser.posts.filter((post) => auth.user.posts.includes(post._id));
        userInfo.updatePosts(updatedPosts);
      }
    }
  }, [auth?.user?.posts]);

  // change tab when clicked
  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
  };

  // create notice when there is not maps/posts created from user
  function getNotice(ownerNotice, nonOwnerNotice){
    return (
      <Box className='flex-column' id='no-maps'>
        <PriorityHighRoundedIcon style={{ width: '15vw', height: '15vw', color: 'var(--icon)' }}/>
        <Typography variant="h3" style={{ marginTop: '2.5vh', width: '75%' }}>
          {
            (isLoggedInUser) ? ownerNotice : nonOwnerNotice
          }
        </Typography>
      </Box>
    )
  }

  // fetch content based on current tab view
  function fetchContent() {
    if (tab === "map") {
      if(userInfo?.currentUser?.maps.length > 0){
        return userInfo?.currentUser?.maps?.map((map, index) => (
          <DynamicCard
            key={`map-${index}`}
            userData={null}
            mapData={map}
            postData={null}
          />
        ));
      }
      else{
        return getNotice('Seems like you have not created any map yet.', 'Seems like this user has not published any map yet.')
      }
    }
    else {
      if(userInfo?.currentUser?.posts.length > 0){
        return userInfo?.currentUser?.posts?.map((post, index) => (
          <DynamicCard
            key={`post-${index}`}
            userData={null}
            mapData={null}
            postData={post}
          />
        ));
      }
      else{
        return getNotice('Seems like you have not created any post yet.', 'Seems like this user has not created any post yet.')
      }
    }
  }

  if (!userInfo?.currentUser) {
    return null;
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
              id={(tab === "map") ? "profile-tab-selected" : "profile-tab"}
              label="All Maps"
              value="map"
            />
            <Tab
              id={(tab === "post") ? "profile-tab-selected" : "profile-tab"}
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
          numMaps={(userInfo?.currentUser?.maps) ? userInfo?.currentUser?.maps.length : 0}
          numPosts={(userInfo?.currentUser?.posts) ? userInfo?.currentUser?.posts.length : 0}
          isLoggedInUser={isLoggedInUser}
        />
        <Modals/>
      </Box>
      <ActionButton isLoggedInUser={isLoggedInUser}/>
    </Box>
  );
}

export default Profile;