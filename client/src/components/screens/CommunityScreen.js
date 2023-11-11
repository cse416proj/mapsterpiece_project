import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../../store";
import { Box, useScrollTrigger } from "@mui/material";
import { SideNavBar, SearchBar, DynamicCard } from "../index";

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
  } else if (store && curScreen === "ALL_MAPS") {
    listCard = (
        <Box sx={{ width: "95%" }}>
          {store.allMaps.filter((pair)=>{
            const searchAllMap = search.toLowerCase();
            return (searchAllMap===''||
                    pair.title.toLowerCase().includes(searchAllMap) ||
                    pair.tags.some(tag => tag.toLowerCase().includes(searchAllMap))
            );
          }).map((pair) => (
            <DynamicCard userData={null} mapData={pair} postData={null} />
          ))}
        </Box>
      );
  } else if (store && curScreen === "ALL_POSTS") {
    listCard = (
        <Box sx={{ width: "95%" }}>
          {store.allPosts.filter((pair)=>{
            const searchAllPost = search.toLowerCase();
            return(searchAllPost === ''||
                   pair.title.toLowerCase().includes(searchAllPost) ||
                   pair.tags.some(tag => tag.toLowerCase().includes(searchAllPost)) ||
                   pair.postBody.toLowerCase().includes(searchAllPost)
            );
          }).map((pair) => (
            <DynamicCard userData={null} mapData={null} postData={pair} />
          ))}
        </Box>
      );

  }

  return (
    <div className="communityScreenWrapper">
      <SideNavBar />
      <Box className="communityScreenRight">
        <SearchBar setSearch = {setSearch}/>
        <Box className="listsDisplay">{listCard}</Box>
      </Box>
    </div>
  );
}
