import React, { useContext } from "react";
import { GlobalStoreContext } from "../../contexts/store";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";

export default function SideNavBar() {
  const { store } = useContext(GlobalStoreContext);

  function handleAllUsers() {
    store.setCurrentView("ALL_USERS")
  }
// Handle maps
  function handleAllMaps() {
    store.setCurrentView("ALL_MAPS")
  }
  function handleBinMap(){
    store.setCurrentView("BIN_MAPS")
  }
  function handleChoMap(){
    store.setCurrentView("CHOROPLETH_MAPS")
  }
  function handleDotMap(){
    store.setCurrentView("DOT_MAPS")
  }
  function handleGradMap(){
    store.setCurrentView("GRAD_MAPS")
  }
  function handleHeatMap(){
    store.setCurrentView("HEAT_MAPS")
  }
// Handle posts
  function handleAllPosts() {
    store.setCurrentView("ALL_POSTS")
  }
  function handleBinPosts() {
    store.setCurrentView("BIN_POSTS")
  }
  function handleChoPosts() {
    store.setCurrentView("CHOROPLETH_POSTS")
  }
  function handleDotPosts() {
    store.setCurrentView("DOT_POSTS")
  }
  function handleGradPosts() {
    store.setCurrentView("GRAD_POSTS")
  }
  function handleHeatPosts() {
    store.setCurrentView("HEAT_POSTS")
  }
  return (
    <Sidebar
      className="sideNavBar"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#dee9eb",
          borderRadius: "5px",
          width: "20vw",
        },
      }}
    >
      <Menu>
        <MenuItem onClick={handleAllUsers}> All Users </MenuItem>
        <SubMenu onClick={handleAllMaps} label="All Maps">
          <MenuItem onClick={handleBinMap}> Bin Map </MenuItem>
          <MenuItem onClick={handleChoMap}> Choropleth Map </MenuItem>
          <MenuItem onClick={handleDotMap}> Dot Distribution Map </MenuItem>
          <MenuItem onClick={handleGradMap}> Graduated Symbol Map </MenuItem>
          <MenuItem onClick={handleHeatMap}> Heat Map </MenuItem>
        </SubMenu>
        <SubMenu onClick={handleAllPosts} label="All Posts">
          <MenuItem onClick={handleBinPosts}> Bin Map </MenuItem>
          <MenuItem onClick={handleChoPosts}> Choropleth Map </MenuItem>
          <MenuItem onClick={handleDotPosts}> Dot Distribution Map </MenuItem>
          <MenuItem onClick={handleGradPosts}> Graduated Symbol Map </MenuItem>
          <MenuItem onClick={handleHeatPosts}> Heat Map </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
