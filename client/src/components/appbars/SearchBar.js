import { useState, useContext } from "react";
import { AppBar, Toolbar, Box, Typography, Paper, InputBase, Menu, MenuItem } from "@mui/material";
import { GlobalStoreContext } from "../../contexts/store";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from '@mui/icons-material/Sort';

export default function SearchBar(props) {
  const { store } = useContext(GlobalStoreContext);
  const currScreen = store.currentView;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    console.log('closeMenu');
    setAnchorEl(null);
  };
 
  const searchPlaceholder = (currScreen) => {
    console.log(currScreen);
    if(currScreen.includes("HOME")){
      return "Select a category first...";
    }
    else if(currScreen.includes("USERS")){
      return "Search by userName/email/id...";
    }
    else if(currScreen.includes("MAPS")){
      return "Search by title/tag...";
    }
    else if(currScreen.includes("POSTS")){
      return "Search by title/tag/context...";
    }
  };

  const getMenuItems = (currScreen) => {
    const alphabetSort = (<>
      <MenuItem onClick={closeMenu}>Alphabet (A-Z)</MenuItem>
      <MenuItem onClick={closeMenu}>Alphabet (Z-A)</MenuItem>
    </>);
    
    if(currScreen.includes("USERS")){
      return(
        <>{alphabetSort}</>
      );
    }
    else if(currScreen.includes("MAPS")){
      return(
        <>
          {alphabetSort}
          <MenuItem onClick={closeMenu}>Most recent edit</MenuItem>
          <MenuItem onClick={closeMenu}>Least recent edit</MenuItem>
          <MenuItem onClick={closeMenu}>Most recent publish</MenuItem>
          <MenuItem onClick={closeMenu}>Least recent publish</MenuItem>
        </>
      );
    }
    else if(currScreen.includes("POSTS")){
      return(
        <>
          {alphabetSort}
          <MenuItem onClick={closeMenu}>Most recent post</MenuItem>
          <MenuItem onClick={closeMenu}>Least recent post</MenuItem>
        </>
      );
    }
    return null;
  }

  const getDropDownMenu = () => {
    return (anchorEl && !currScreen.includes("HOME")) ? (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        onBlur={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { getMenuItems(currScreen) }
      </Menu>
    ) : null;
  }

  return (
    <AppBar
      position="static"
      className="searchBar"
      style={{ backgroundColor: 'var(--primary-color)' }}
    >
      <Toolbar className="toolbarFlex">
        <Box className="flex-row">
          <SearchIcon fontSize="large" style={{ color: `black` }} />
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
              width: (currScreen.includes("HOME")) ? "72.5vw" : "62.5vw",
            }}
          >
            <InputBase 
              onChange={(event)=>props.setSearch(event.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder={searchPlaceholder(currScreen)} // to be replace with what to actually search for
            />
          </Paper>
        </Box>
        {
          (currScreen.includes("HOME")) ?
            null :
            (
              <Box className="flex-row" onClick={openMenu}>
                <Typography variant="p" style={{ color: 'black', marginRight: '10px' }}>
                  Sort By
                </Typography>
                <SortIcon style={{ color: 'black' }} fontSize="large"/>
                {
                  getDropDownMenu()
                }
              </Box>
            )
        }
      </Toolbar>
    </AppBar>
  );
}
