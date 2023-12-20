import { useState, useContext, useEffect, useRef } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";

import { DynamicCard, Modals, CreatePrompt, Loading, SortBy, DataSeachBar } from "../../../index";
import { HomeNavCard } from "../index";

import AuthContext from "../../../../contexts/auth";
import GlobalStoreContext from "../../../../contexts/store";
import MapContext from "../../../../contexts/map";
import PostContext from "../../../../contexts/post";
import UserContext from "../../../../contexts/user";

function UserHomeScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { userInfo } = useContext(UserContext);
  const { postInfo } = useContext(PostContext);
  const { mapInfo } = useContext(MapContext);

  const [tab, setTab] = useState('ALL_MAPS');

  const [sortBy, setSortBy] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const inputRef = useRef(null);

  const [loadingMaps, setLoadingMaps] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [cancelLoadMap, setCancelLoadMap] = useState(false);
  const [cancelLoadPost, setCancelLoadPost] = useState(false);

  const [mapCards, setMapCards] = useState(null);
  const [postCards, setPostCards] = useState(null);

  // load maps & posts everytime user has update
  useEffect(() => {
    if(auth && auth.user) {
      console.log(auth.user);
      
      userInfo.setCurrentUser(auth.user);

      // close all success alert message
      store.closeModal();

      if(auth.user.maps?.length > 0){
        console.log('now load maps')
        setLoadingMaps(true);
        mapInfo.getMapsByMapIds(auth.user.maps);
      }

      if(auth.user.posts?.length > 0){
        console.log('now load posts')
        setLoadingPosts(true);
        postInfo.getPostsByPostIds(auth.user.posts);
      }

      mapInfo.clearTrans();
    }
  }, [auth?.user]);

  function handleCancelLoadMap(){
    setCancelLoadMap(true);
  }

  console.log(mapInfo?.allMapsByUser);

  // reload maps when current allMaps array changed
  useEffect(() => {
    if(cancelLoadMap){
      if(mapInfo?.allMapsByUser?.length > 0){
        setLoadingMaps(false);
        setMapCards(mapInfo?.allMapsByUser?.map((pair, index) => (
          <DynamicCard key={index} userData={null} mapData={pair} postData={null}/>
        )));
      }
      else{
        setMapCards(<CreatePrompt type='map'/>);
      }
      setCancelLoadMap(false);
    }
    }, [cancelLoadMap]);

  // reload maps when current allMaps array changed
  useEffect(() => {
    if(mapInfo?.allMapsByUser?.length > 0){
      setLoadingMaps(false);
      setMapCards(mapInfo?.allMapsByUser.map((pair, index) => (
        <DynamicCard key={index} userData={null} mapData={pair} postData={null}/>
      )));
    }
    else{
      if(!loadingMaps && auth?.user?.maps?.length === 0 && mapInfo?.allMapsByUser && mapInfo?.allMapsByUser?.length === 0){
        setLoadingMaps(false);
        setMapCards(<CreatePrompt type='map'/>);
      }
      else{
        setMapCards(<Loading message='Currently fetching all maps created by user...' cancelHandler={handleCancelLoadMap}/>);
      }
    }
  }, [mapInfo?.allMapsByUser]);

  // function to render all map cards
  function renderAllMaps(){
    if(!mapInfo?.allMapsByUser && loadingMaps){
      return <Loading message='Currently fetching all maps created by user...' cancelHandler={handleCancelLoadMap}/>;
    }

    if(mapInfo?.allMapsByUser?.length > 0){
      return (
        <Box className='flex-column' id='all-container'>
          <>{mapCards}</>
        </Box>
      );
    }
    return <CreatePrompt type='map'/>;
  }

  function handleCancelLoadPost(){
    setCancelLoadPost(true);
  }

  // reload maps when current allMaps array changed
  useEffect(() => {
    if(cancelLoadPost){
      if(postInfo.allPostsByUser?.length>0){
        setLoadingPosts(false);
        setPostCards(postInfo?.allPostsByUser?.map((pair, index) => (
          <DynamicCard key={index} userData={null} mapData={null} postData={pair}/>
        )));
      }
      else{
        setPostCards(<CreatePrompt type='post'/>);
      }
      setCancelLoadPost(false);
    }
  }, [cancelLoadPost]);

  // reload post when current allPosts array changed
  useEffect(() => {
    if(postInfo?.allPostsByUser?.length > 0){
      setLoadingPosts(false);
      setPostCards(postInfo?.allPostsByUser?.map((pair, index) => (
        <DynamicCard key={index} userData={null} mapData={null} postData={pair}/>
      )));
    }
    else{
      if(!loadingPosts && auth?.user?.posts?.length === 0 && postInfo?.allPostsByUser && postInfo?.allPostsByUser?.length === 0){
        setLoadingPosts(false);
        setPostCards(<CreatePrompt type='post'/>);
      }
      else{
        setPostCards(<Loading message='Currently fetching all posts created by user...' cancelHandler={handleCancelLoadPost}/>);
      }
    }
  }, [postInfo?.allPostsByUser]);

  // function to render all post cards
  function renderAllPosts(){
    if(!postInfo?.allPostsByUser && loadingPosts){
      return <Loading message='Currently fetching all posts created by user...' cancelHandler={handleCancelLoadPost}/>;
    }
    
    if(postInfo?.allPostsByUser?.length > 0){
      return (
        <Box className='flex-column' id='all-container'>
          <>{postCards}</>
        </Box>
      );
    }
    return <CreatePrompt type='post'/>;
  }

  // update view when tab get clicked
  const handleChangeTab = (event, newTab) => {
    event.stopPropagation();
    event.preventDefault();
    setTab(newTab);
    setSortBy('');
    setSearchInput('');
    setSearchResult(null);

    if(inputRef.current){
      inputRef.current.value = '';
    }
  }

  return (
    <Box className="home-content">
      <Typography id='welcome-text' variant="h3">Welcome, {auth.user.firstName}!</Typography>
      <Box className="home-feed">
        <Box className='flex-column'>
          <Box className='flex-row' id='view-bar'>
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
            <DataSeachBar
              type={(tab === 'ALL_MAPS') ? 'map' : 'post'}
              inputRef={inputRef}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSearchResult={setSearchResult}
              data={(tab === 'ALL_MAPS') ? mapInfo?.allMapsByUser : postInfo?.allPostsByUser}
              setCards={(tab === 'ALL_MAPS') ? setMapCards : setPostCards}
            />
            <SortBy
              type={(tab === 'ALL_MAPS') ? 'map' : 'post'}
              sortBy={sortBy}
              setSortBy={setSortBy}
              isLoggedInUser={true}
              searchResult={searchResult}
              data={(tab === 'ALL_MAPS') ? mapInfo?.allMapsByUser : postInfo?.allPostsByUser}
              setCards={(tab === 'ALL_MAPS') ? setMapCards : setPostCards}
              style={{width: '10%'}}
            />
          </Box>
          <Box className="display-container">
            {
              (tab === 'ALL_MAPS') ?
                renderAllMaps() :
                renderAllPosts()
            }
          </Box>
        </Box>
        <HomeNavCard/>
      </Box>
      <Modals/>
    </Box>
  );
}

export default UserHomeScreen;
