import React, { useContext, useState } from "react";
import { Typography, Box } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import { SideNavBar, SearchBar, UsersCardSection, MapsCardSection, PostsCardSection, DeletePostModal } from "../../index";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);
  const currScreen = store.currentView;

  const  [search, setSearch] = useState('');
  // console.log(search);

  function renderComponent(currScreen){
    var data = store.getData(currScreen);

    switch(currScreen){
      case "ALL_USERS":
        return <UsersCardSection data={data} search={search}/>
      case "ALL_MAPS":
      case "BIN_MAPS":
      case "CHOROPLETH_MAPS":
      case "DOT_MAPS":
      case "GRAD_MAPS":
      case "HEAT_MAPS":
        return <MapsCardSection data={data} search={search}/>;
      case "ALL_POSTS":
      case "BIN_POSTS":
      case "CHOROPLETH_POSTS":
      case "DOT_POSTS":
      case "GRAD_POSTS":
      case "HEAT_POSTS":
        return <PostsCardSection data={data} search={search}/>;
      default:
        return <Typography variant='h5' style={{ marginTop: '1.5vh' }}>Select Users, Maps, or Posts on the right.</Typography>;
    }
  }

  let listCard = <Typography variant='h5' style={{ marginTop: '1.5vh' }}>Select Users, Maps, or Posts on the right.</Typography>;
  if(store){
    listCard = renderComponent(currScreen);
  }

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
