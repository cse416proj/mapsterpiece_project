import React, { useContext, useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import { SideNavBar, SearchBar, UsersCardSection, MapsCardSection, PostsCardSection, DeletePostModal } from "../../index";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);

  const [search, setSearch] = useState('');
  const [listCard, setListCard] = useState(null);
  const [currScreen, setCurrScreen] = useState("HOME");

  // Now update currScreen; reason: currentView changes in Store
  useEffect(() => {
    if(store?.currentView){
      setCurrScreen(store?.currentView);
    }
  }, [store?.currentView]);

  // Now update list card rendering; reason: store changes in Store or search changes in SearchScreen
  useEffect(() => {
    if(store){
      var data = store.getData(store.currentView);

      console.log(currScreen);

      switch(store.currentView){
        case "ALL_USERS":
          setListCard(<UsersCardSection data={data} search={search}/>);
          break;
        case "ALL_MAPS":
        case "BIN_MAPS":
        case "CHOROPLETH_MAPS":
        case "DOT_MAPS":
        case "GRAD_MAPS":
        case "HEAT_MAPS":
          setListCard(<MapsCardSection data={data} search={search}/>);
          break;
        case "ALL_POSTS":
        case "BIN_POSTS":
        case "CHOROPLETH_POSTS":
        case "DOT_POSTS":
        case "GRAD_POSTS":
        case "HEAT_POSTS":
          setListCard(<PostsCardSection data={data} search={search}/>);
          break;
        default:
          setListCard(<Typography variant='h5' style={{ marginTop: '1.5vh' }}>Select Maps and/or Posts on the right.</Typography>);
          break;
      }
    }
  }, [currScreen, search, store]);

  return (
    <Box className="queryScreenWrapper">
      <SideNavBar />
      <Box className="queryScreenContent">
        <SearchBar setSearch={setSearch}/>
        <Box className="listsDisplay">
          {listCard}
        </Box>
      </Box>
      <DeletePostModal/>
    </Box>
  );
}
