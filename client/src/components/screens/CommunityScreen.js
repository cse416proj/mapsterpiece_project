import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../../store";
import { Box } from "@mui/material";
import { SideNavBar, SearchBar, DynamicCard, MapsCardSection,PostsCardSection, DeletePostModal } from "../index";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);
  const curScreen = store.currentView;

  const  [search, setSearch] = useState('');
  console.log(search);

  let listCard = "Select Users, Maps, or Posts on the right."; 
  if (store && curScreen === "ALL_USERS") {
    listCard = (
      <Box sx={{ width: "95%" }}>
        {store.allUsers.filter((pair)=>{
          const searchUser = search.toLowerCase();
          return (searchUser==='' ||
                 pair.userName.toLowerCase().includes(searchUser) ||
                 pair.email.toLowerCase().includes(searchUser) ||
                 pair._id.$oid.toLowerCase().includes(searchUser)
          );
        }).map((pair) => (
          <DynamicCard userData={pair} mapData={null} postData={null} />
        ))}
      </Box>
    );
  } 
  
  else if (store && curScreen === "ALL_MAPS") {
    listCard = <MapsCardSection data={store.allMaps} search={search} />;
  } else if (store && curScreen === "BIN_MAPS") {
    listCard = <MapsCardSection data={store.binMaps} search={search} />;
  } else if (store && curScreen === "CHOROPLETH_MAPS") {
    listCard = <MapsCardSection data={store.choroplethMaps} search={search} />;
  } else if (store && curScreen === "DOT_MAPS") {
    listCard = <MapsCardSection data={store.dotMaps} search={search} />;
  } else if (store && curScreen === "GRAD_MAPS") {
    listCard = <MapsCardSection data={store.gradMaps} search={search} />;
  } else if (store && curScreen === "HEAT_MAPS") {
    listCard = <MapsCardSection data={store.heatMaps} search={search} />;
  }
    
  else if (store && curScreen === "ALL_POSTS") {
    listCard = <PostsCardSection data={store.allPosts} search={search} />;
  } else if (store && curScreen === "BIN_POSTS") {
    listCard = <PostsCardSection data={store.binPosts} search={search} />;
  } else if (store && curScreen === "CHOROPLETH_POSTS") {
    listCard = <PostsCardSection data={store.choroplethPosts} search={search} />;
  } else if (store && curScreen === "DOT_POSTS") {
    console.log(store.dotPosts);
    listCard = <PostsCardSection data={store.dotPosts} search={search} />;
  } else if (store && curScreen === "GRAD_POSTS") {
    listCard = <PostsCardSection data={store.gradPosts} search={search} />;
  } else if (store && curScreen === "HEAT_POSTS") {
    listCard = <PostsCardSection data={store.heatPosts} search={search} />;
  }

  return (
    <div className="communityScreenWrapper">
      <SideNavBar />
      <Box className="communityScreenRight">
        <SearchBar setSearch = {setSearch}/>
        <Box className="listsDisplay">{listCard}</Box>
        <DeletePostModal/>
      </Box>
    </div>
  );
}
