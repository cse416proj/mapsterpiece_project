import { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Box, Tabs, Tab, Typography } from "@mui/material";
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';

import ProfileCard from "./ProfileCard";
import ActionButton from "./ActionButton";
import { DynamicCard, Modals, Loading, SortBy, Warning } from "../../index";

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
  const [tab, setTab] = useState("ALL_MAPS");

  const [sortBy, setSortBy] = useState('');

  const [loadingMaps, setLoadingMaps] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [mapCards, setMapCards] = useState(null);
  const [postCards, setPostCards] = useState(null);

  const isLoggedInUser = (auth && auth.user !== null && auth.user.userName === userInfo?.currentUser?.userName);

  // fetch user info based on id
  useEffect(() => {
    userInfo.getUserById(userId);
    mapInfo.clearTrans();
  }, [userId]);

  // only load other user's publish map
  useEffect(() => {
    if(!isLoggedInUser && userInfo?.currentUser && userId){
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
        const updatedMaps = userInfo.currentUser.maps?.filter((map) => auth.user.maps.includes(map._id));
        userInfo.updateMaps(updatedMaps);
      }
    }
  }, [auth?.user?.maps]);

  // update curr user posts when we are viewing auth user's profile and auth posts updates
  useEffect(() => {
    if(isLoggedInUser) {
      if(userInfo?.currentUser?.posts?.length !== auth?.user?.posts?.length){
        const updatedPosts = userInfo.currentUser.posts?.filter((post) => auth.user.posts.includes(post._id));
        userInfo.updatePosts(updatedPosts);
      }
    }
  }, [auth?.user?.posts]);

  // set up map cards when it is ready
  useEffect(() => {
    let maps = userInfo?.currentUser?.maps;

    if(!auth || !isLoggedInUser){
      maps = maps?.filter(map => map.isPublished);
    }

    if(maps?.length > 0){
      setMapCards(maps?.map((map, index) => {
        if(typeof map === 'string'){
          setLoadingMaps(true);
          return null;
        }
        else{
          setLoadingMaps(false);
          return <DynamicCard key={`map-${index}`} userData={null} mapData={map} postData={null}/>;
        }
      }));
    }
    else{
      setMapCards(
        getNotice('Seems like you have not created any map yet.', 'Seems like this user has not published any map yet.')
      );
    }
  }, [userInfo?.currentUser?.maps]);

  // bring loading effect for maps
  useEffect(() => {
    if(loadingMaps){
      setMapCards(<Loading message='Currently fetching all maps created by user...'/>);
    }
  }, [loadingMaps]);

  // set up post cards when it is ready
  useEffect(() => {
    console.log(userInfo?.currentUser?.posts?.length);

    if(userInfo?.currentUser?.posts?.length > 0){
      setPostCards(userInfo?.currentUser?.posts?.map((post, index) => {
        if(typeof post === 'string'){
          setLoadingPosts(true);
          return null;
        }
        else{
          setLoadingPosts(false);
          return <DynamicCard key={`post-${index}`} userData={null} mapData={null} postData={post}/>;
        }
      }));
    }
    else{
      setPostCards(
        getNotice('Seems like you have not created any post yet.', 'Seems like this user has not created any post yet.')
      );
    }
  }, [userInfo?.currentUser?.posts]);

  // bring loading effect for posts
  useEffect(() => {
    if(loadingPosts){
      setPostCards(<Loading message='Currently fetching all posts created by user...'/>);
    }
  }, [loadingPosts]);

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

  // function to render all map cards
  function renderAllMaps(){
    if(!userInfo?.currentUser?.maps && loadingMaps){
      return <Loading message='Currently fetching all maps created by user...'/>;
    }

    if(userInfo?.currentUser?.maps?.length > 0){
      return (
        <Box className='flex-column' id='all-container'>
          <>{mapCards}</>
        </Box>
      );
    }

    return getNotice('Seems like you have not created any map yet.', 'Seems like this user has not created any map yet.')
  }

  // function to render all posts cards
  function renderAllPosts(){
    if(!userInfo?.currentUser?.posts && loadingPosts){
      return <Loading message='Currently fetching all posts created by user...'/>;
    }

    if(userInfo?.currentUser?.posts?.length > 0){
      return (
        <Box className='flex-column' id='all-container'>
          <>{postCards}</>
        </Box>
      );
    }

    return getNotice('Seems like you have not created any post yet.', 'Seems like this user has not created any post yet.')
  }

  if(userInfo?.error){
    return <Warning message={userInfo?.error}/>;
  }

  if (!userInfo?.currentUser) {
    return <Loading message='Currently loading user data...'/>;
  }

  return (
    <Box className="content" id="user-info-content">
      <Box className="flex-row" id="user-info">
        <Box id="all-maps-posts">
        <Box className='flex-row' id='view-bar' style={{ width: '60vw' }}>
            <Tabs
              className='flex-row'
              id='tab-section'
              onChange={handleChangeTab}
              value={tab}
              style={{ width: '30%' }}
            >
              <Tab
                id={tab === 'ALL_MAPS' ? 'tab' : 'tab-selected'}
                style={{ width: '50%' }}
                label='all maps'
                value='ALL_MAPS'
              />
              <Tab
                id={tab === 'ALL_POSTS' ? 'tab' : 'tab-selected'}
                style={{ width: '50%' }}
                label='all posts'
                value='ALL_POSTS'
              />
            </Tabs>
            <SortBy
              type={(tab === 'ALL_MAPS') ? 'map' : 'post'}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isLoggedInUser={isLoggedInUser}
              data={(tab === 'ALL_MAPS') ? userInfo?.currentUser?.maps : userInfo?.currentUser?.posts}
              setCards={(tab === 'ALL_MAPS') ? setMapCards : setPostCards}
              style={{width: '30%'}}
            />
          </Box>
          <Box id='profile-cards'>
            {
              (tab === "ALL_MAPS") ?
                renderAllMaps() :
                renderAllPosts()
            }
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