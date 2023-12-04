import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { GlobalStoreContext } from "../../../contexts/store";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";

export default function SideNavBar(props) {
  const location = useLocation();
  const { store } = useContext(GlobalStoreContext);

  const handleSelectView = (event, viewType) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(`handleSelectView: ${viewType}`);
    store.setCurrentView(viewType);
    props.setSearch('');
  }

  const handleSelectViewAll = (event, allScreen, ownScreen) => {
    if(location.pathname === '/community'){
      handleSelectView(event, allScreen);
    }
    else{
      handleSelectView(event, ownScreen);
    }
  }

  const handleSelectAllMaps = (event) => {
    handleSelectViewAll(event, "ALL_MAPS", "USER_OWNED_MAPS");
  }

  const handleSelectAllPosts = (event) => {
    handleSelectViewAll(event, "ALL_POSTS", "USER_OWNED_POSTS");
  }

  return (
    <Sidebar
      className="sideNavBar"
      width='20vw'
      backgroundColor="#dee9eb"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          borderRadius: "5px",
        }
      }}
    >
      <Menu>
        {
          (location.pathname === '/community' || location.pathname === '/community/') ?
            <MenuItem onClick={(e) => handleSelectView(e, "ALL_USERS")} id = "ALL_USERS"> All Users </MenuItem> :
            <MenuItem onClick={(e) => handleSelectView(e, "ALL_MAPS_POSTS")} id="ALL_MAPS_POSTS"> All Maps & Posts </MenuItem> 
        }
        <SubMenu onClick={handleSelectAllMaps} label="All Maps" id="AllMaps">
          <MenuItem onClick={(e) => handleSelectView(e, "BIN_MAPS")} id="BIN_MAPS"> Bin Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "CHOROPLETH_MAPS")} id="CHOROPLETH_MAPS"> Choropleth Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "DOT_MAPS")} id="DOT_MAPS"> Dot Distribution Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "GRAD_MAPS")} id="GRAD_MAPS"> Graduated Symbol Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "HEAT_MAPS")} id="HEAT_MAPS"> Heat Map </MenuItem>
        </SubMenu>
        <SubMenu onClick={handleSelectAllPosts} label="All Posts" id="AllPosts">
          <MenuItem onClick={(e) => handleSelectView(e, "BIN_POSTS")} id="BIN_POSTS"> Bin Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "CHOROPLETH_POSTS")} id="CHOROPLETH_POSTS"> Choropleth Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "DOT_POSTS")} id="DOT_POSTS"> Dot Distribution Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "GRAD_POSTS")} id="GRAD_POSTS"> Graduated Symbol Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "HEAT_POSTS")} id="HEAT_POSTS"> Heat Map </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
