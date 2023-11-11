import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Paper,
  InputBase,
} from "@mui/material";

import { useContext,useState } from "react";
import { GlobalStoreContext } from "../../store";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export default function SearchBar(props) {
  const { store } = useContext(GlobalStoreContext);
  const curScreen = store.currentView;
  console.log(curScreen);

  const searchPlaceholder = (curScreen)=>{
    if(curScreen.includes("HOME")){
      return "Select a category first...";
    }
    else if(curScreen.includes("USERS")){
      return "Search by userName/email/id...";
    } else if(curScreen.includes("MAPS")){
      return "Search by title/tag...";
    } else if(curScreen.includes("POSTS")){
      return "Search by title/tag/context...";
    }
  };

  return (
    <AppBar
      position="static"
      className="searchBar"
      style={{ backgroundColor: `#86cab5` }}
    >
      <Toolbar className="toolbarFlex">
        <Box className="flex-row">
          <SearchIcon fontSize="large" style={{ color: `black` }} />
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: 400,
              marginLeft: "10px",
            }}
          >
            <InputBase 
              onChange={(event)=>props.setSearch(event.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder={searchPlaceholder(curScreen)} // to be replace with what to actually search for
            />
          </Paper>
        </Box>
        <Box className="flex-row">
          <Typography color="black" style={{ marginRight: `10px` }}>
            Sort By
          </Typography>
          <MenuIcon style={{ color: `black` }} fontSize="large" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
