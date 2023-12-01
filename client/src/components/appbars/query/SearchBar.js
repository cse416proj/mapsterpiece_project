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

  const handleSortUserA2Z = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('A2Z-user');
    setAnchorEl(null);
  }

  const handleSortUserZ2A = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('Z2A-user');
    setAnchorEl(null);
  }

  const handleSortMapA2Z = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('A2Z-map');
    setAnchorEl(null);
  }

  const handleSortMapZ2A = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('Z2A-map');
    setAnchorEl(null);
  }
  const handleSortMapMREdit = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('MostRecentEdit-map');
    setAnchorEl(null);
  }
  const handleSortMapLREdit = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('LeastRecentEdit-map');
    setAnchorEl(null);
  }
  const handleSortMapMRPublish = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('MostRecentPublish-map');
    setAnchorEl(null);
  }
  const handleSortMapLRPublish = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('LeastRecentPublish-map');
    setAnchorEl(null);
  }

  const handleSortPostA2Z = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('A2Z-post');
    setAnchorEl(null);
  }

  const handleSortPostZ2A = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('Z2A-post');
    setAnchorEl(null);
  }

  const handleSortPostMR = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('MostRecent-post');
    setAnchorEl(null);
  }

  const handleSortPostLR= (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('LeastRecent-post');
    setAnchorEl(null);
  }

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
          { sortBy: 'Alphabet (A-Z)', handler: handleSortUserA2Z },
          { sortBy: 'Alphabet (Z-A)', handler: handleSortUserZ2A },
        ]
      )
    }
    else if(currScreen.includes("MAPS")){
      setPlaceholder('Search by title/tag...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: handleSortMapA2Z },
          { sortBy: 'Alphabet (Z-A)', handler: handleSortMapZ2A },
          { sortBy: 'Most recent edit', handler: handleSortMapMREdit },
          { sortBy: 'Least recent edit', handler: handleSortMapLREdit },
          { sortBy: 'Most recent publish', handler: handleSortMapMRPublish },
          { sortBy: 'Least recent publish', handler: handleSortMapLRPublish },
          
        ]
      )
    }
    else if(currScreen.includes("POSTS")){
      setPlaceholder('Search by title/tag/context...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: handleSortPostA2Z },
          { sortBy: 'Alphabet (Z-A)', handler: handleSortPostZ2A },
          { sortBy: 'Most recent post', handler: handleSortPostMR },
          { sortBy: 'Least recent post', handler: handleSortPostLR },
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
            onSubmit={(event) => {event.preventDefault();}}
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
