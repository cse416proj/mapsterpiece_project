import React, { useContext, useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import { SideNavBar, SearchBar, UsersCardSection, MapsCardSection, PostsCardSection, Modals, Loading } from "../../index";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);

  const [search, setSearch] = useState('');
  const [listCard, setListCard] = useState(null);
  const [currScreen, setCurrScreen] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [loadingMaps, setLoadingMaps] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingMaps(true);
    setLoadingPosts(true);
    setLoadingUsers(true);
    store.getAllMaps();
    store.getAllPosts();
    store.getAllUsers();
  }, []);

  // Now update currScreen; reason: currentView changes in Store
  useEffect(() => {
    if(store?.currentView){
      setCurrScreen(store?.currentView);
    }
  }, [store?.currentView]);

  // loading maps
  useEffect(() => {
    if(store?.allMaps){
      setLoadingMaps(false);
    }
  },[store?.allMaps]);

  // loading posts
  useEffect(() => {
    if(store?.allPosts){
      setLoadingPosts(false);
    }
  },[store?.allPosts]);

  // loading users
  useEffect(() => {
    if(store?.allUsers){
      setLoadingUsers(false);
    }
  },[store?.allUsers]);

  // Now update list card rendering; reason: store changes in Store or search changes in SearchScreen
  useEffect(() => {
    if(store){
      console.log(`currScreen: ${currScreen}`);

      if(currScreen === 'ALL_USERS' && loadingUsers){
        setListCard(<Loading message='Currently fetching all users...'/>);
        return;
      }
      else if(currScreen === 'ALL_MAPS' && loadingMaps){
        setListCard(<Loading message='Currently fetching all maps...'/>);
        return;
      }
      else if(currScreen === 'ALL_POSTS' && loadingPosts){
        setListCard(<Loading message='Currently fetching all posts...'/>);
        return;
      }

      var data = store.getData(currScreen);

      if(!data){
        setListCard(null);
        return;
      }

      switch(currScreen){
        case "ALL_USERS":
          setListCard(<UsersCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
          break;
        case "ALL_MAPS":
        case "PIN_MAPS":
        case "CHOROPLETH_MAPS":
        case "DOT_MAPS":
        case "GRAD_MAPS":
        case "HEAT_MAPS":
          setListCard(<MapsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
          break;
        case "ALL_POSTS":
        case "PIN_POSTS":
        case "CHOROPLETH_POSTS":
        case "DOT_POSTS":
        case "GRAD_POSTS":
        case "HEAT_POSTS":
          setListCard(<PostsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
          break;
        default:
          setListCard(null);
          break;
      }
    }
  }, [currScreen, search, store, sortBy]);

  function renderCard(){
    if(listCard){
      return listCard;
    }

    return <Typography variant='h5' style={{ marginTop: '1.5vh' }} id="community-text">You can search for everyone's maps and posts on this page.<br /><br />Select Maps/Posts/Users on the right.</Typography>

  }

  return (
    <Box className="queryScreenWrapper">
      <SideNavBar setSearch={setSearch}/>
      <Box className="queryScreenContent">
        <SearchBar setSearch={setSearch} setSortBy={setSortBy}/>
        <Box className="listsDisplay">
          {
            renderCard()
          }
        </Box>
        <Modals/>
      </Box>
    </Box>
  );
}
