import React, { useContext, useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import { PostContext } from "../../../contexts/post";
import { SideNavBar, SearchBar, UsersCardSection, MapsCardSection, PostsCardSection, Modals } from "../../index";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);
  const { postInfo } = useContext(PostContext);

  const [search, setSearch] = useState('');
  const [listCard, setListCard] = useState(null);
  const [currScreen, setCurrScreen] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
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

  // Now update list card rendering; reason: store changes in Store or search changes in SearchScreen
  useEffect(() => {
    if(store){
      console.log(`currScreen: ${currScreen}`);

      var data = store.getData(currScreen);

      // console.log(currScreen);
      // console.log(data);

      if(!data){
        setListCard(null);
        return;
      }

      switch(currScreen){
        case "ALL_USERS":
          setListCard(<UsersCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
          break;
        case "ALL_MAPS":
        case "BIN_MAPS":
        case "CHOROPLETH_MAPS":
        case "DOT_MAPS":
        case "GRAD_MAPS":
        case "HEAT_MAPS":
          setListCard(<MapsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
          break;
        case "ALL_POSTS":
        case "BIN_POSTS":
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
    return <Typography variant='h5' style={{ marginTop: '1.5vh' }}>You can search for everyone's maps and posts on this page.<br /><br />Select Maps/Posts/Users on the right.</Typography>
  }

  return (
    <Box className="queryScreenWrapper">
      <SideNavBar />
      <Box className="queryScreenContent">
        <SearchBar setSearch={setSearch} setSortBy = {setSortBy}/>
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
