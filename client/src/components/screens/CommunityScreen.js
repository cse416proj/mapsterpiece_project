import React, { useContext } from "react";
import { GlobalStoreContext } from "../../store";
import { Box } from "@mui/material";
import { SideNavBar, SearchBar, DynamicCard } from "../index";

export default function CommunityScreen() {
  const { store } = useContext(GlobalStoreContext);
  const curScreen = store.currentView;

  let listCard = "Nothing was found";
  if (store && curScreen === "ALL_USERS") {
    listCard = (
      <Box sx={{ width: "95%" }}>
        {store.allUsers.map((pair) => (
          <DynamicCard userData={pair} mapData={null} postData={null} />
        ))}
      </Box>
    );
  } else if (store && curScreen === "ALL_MAPS") {
    listCard = (
        <Box sx={{ width: "95%" }}>
          {store.allMaps.map((pair) => (
            <DynamicCard userData={null} mapData={pair} postData={null} />
          ))}
        </Box>
      );
  } else if (store && curScreen === "ALL_POSTS") {
    listCard = (
        <Box sx={{ width: "95%" }}>
          {store.allPosts.map((pair) => (
            <DynamicCard userData={null} mapData={null} postData={pair} />
          ))}
        </Box>
      );

  }

  return (
    <div className="communityScreenWrapper">
      <SideNavBar />
      <Box className="communityScreenRight">
        <SearchBar />
        <Box className="listsDisplay">{listCard}</Box>
      </Box>
    </div>
  );
}
