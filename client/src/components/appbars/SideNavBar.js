import React, { useContext } from "react";
import { GlobalStoreContext } from "../../store";

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

  function handleAllPosts() {
    store.setCurrentView("ALL_POSTS")
  }

  function handleAllMaps() {
    store.setCurrentView("ALL_MAPS")
  }

  return (
    <Sidebar
      className="sideNavBar"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#dee9eb",
          marginTop: "1vh",
          borderRadius: "5px",
          width: "20vw",
        },
      }}
    >
      <Menu>
        <MenuItem onClick={handleAllUsers}> All Users </MenuItem>
        <SubMenu onClick={handleAllMaps} label="All Maps">
          <MenuItem> Bin Map </MenuItem>
          <MenuItem> Choropleth Map </MenuItem>
          <MenuItem> Dot Distribution Map </MenuItem>
          <MenuItem> Graduated Symbol Map </MenuItem>
          <MenuItem> Heat Map </MenuItem>
        </SubMenu>
        <SubMenu onClick={handleAllPosts} label="All Posts">
          <MenuItem> Bin Map </MenuItem>
          <MenuItem> Choropleth Map </MenuItem>
          <MenuItem> Dot Distribution Map </MenuItem>
          <MenuItem> Graduated Symbol Map </MenuItem>
          <MenuItem> Heat Map </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
