import { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, Paper, InputBase, Menu, MenuItem } from "@mui/material";
import { GlobalStoreContext } from "../../../contexts/store";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from '@mui/icons-material/Sort';

export default function SearchBar(props) {
  const { store } = useContext(GlobalStoreContext);

  const [currScreen, setCurrScreen] = useState("HOME");
  const [placeholder, setPlaceholder] = useState('Select a category first...');
  const [menuItems, setMenuItems] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // open or close dropdown menu
  const openMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  // Now update currScreen; reason: currentView changes in Store
  useEffect(() => {
    if(store?.currentView){
      setCurrScreen(store?.currentView);
    }
  }, [store?.currentView]);

  // Now update placeholder & menu items; reason: currScreen changes in SearchBar
  useEffect(() => {
    if(currScreen.includes("USERS")){
      setPlaceholder('Search by userName/email/id...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: closeMenu },
          { sortBy: 'Alphabet (Z-A)', handler: closeMenu },
        ]
      )
    }
    else if(currScreen.includes("MAPS")){
      setPlaceholder('Search by title/tag...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: closeMenu },
          { sortBy: 'Alphabet (Z-A)', handler: closeMenu },
          { sortBy: 'Most recent edit', handler: closeMenu },
          { sortBy: 'Least recent edit', handler: closeMenu },
          { sortBy: 'Most recent publish', handler: closeMenu },
          { sortBy: 'Least recent publish', handler: closeMenu },
          
        ]
      )
    }
    else if(currScreen.includes("POSTS")){
      setPlaceholder('Search by title/tag/context...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: closeMenu },
          { sortBy: 'Alphabet (Z-A)', handler: closeMenu },
          { sortBy: 'Most recent post', handler: closeMenu },
          { sortBy: 'Least recent post', handler: closeMenu },
        ]
      )
    }
    else{
      setPlaceholder('Select a category first...');
      setMenuItems([]);
    }
  }, [currScreen]);

  // render menuitems based on menuItems array
  function renderDynamicMenuItems(){
    return menuItems.map((item) => {
      return <MenuItem key={item.sortBy} onClick={item.handler}>{item.sortBy}</MenuItem>;
    });
  }

  // render dropdown menu when called
  const getDropDownMenu = () => {
    return (anchorEl && !currScreen.includes("HOME")) ? (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { renderDynamicMenuItems() }
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
              placeholder={placeholder} // to be replace with what to actually search for
            />
          </Paper>
        </Box>
        {
          (currScreen.includes("HOME")) ?
            null :
            (
              <Box className="flex-row" id='sort-prompt' onClick={openMenu}>
                <Typography variant="p" id="sort-text"> Sort By </Typography>
                <SortIcon id="sort-icon" fontSize="large"/>
                { getDropDownMenu() }
              </Box>
            )
        }
      </Toolbar>
    </AppBar>
  );
}
