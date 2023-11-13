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

  const handleSelectView = (event, viewType) => {
    store.setCurrentView(viewType);
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
        <MenuItem onClick={(e) => handleSelectView(e, "ALL_USERS")}> All Users </MenuItem>
        <SubMenu onClick={(e) => handleSelectView(e, "ALL_MAPS")} label="All Maps">
          <MenuItem onClick={(e) => handleSelectView(e, "BIN_MAPS")}> Bin Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "CHOROPLETH_MAPS")}> Choropleth Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "DOT_MAPS")}> Dot Distribution Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "GRAD_MAPS")}> Graduated Symbol Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "HEAT_MAPS")}> Heat Map </MenuItem>
        </SubMenu>
        <SubMenu onClick={(e) => handleSelectView(e, "ALL_POSTS")} label="All Posts">
          <MenuItem onClick={(e) => handleSelectView(e, "BIN_POSTS")}> Bin Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "CHOROPLETH_POSTS")}> Choropleth Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "DOT_POSTS")}> Dot Distribution Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "GRAD_POSTS")}> Graduated Symbol Map </MenuItem>
          <MenuItem onClick={(e) => handleSelectView(e, "HEAT_POSTS")}> Heat Map </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
