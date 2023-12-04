import { useState, useContext, useEffect, useRef } from "react";
import { AppBar, Toolbar, Box, Typography, Paper, InputBase, Menu, MenuItem } from "@mui/material";
import { GlobalStoreContext } from "../../../contexts/store";
import UserContext from "../../../contexts/user";
import AuthContext from "../../../contexts/auth";

import SearchIcon from "@mui/icons-material/Search";
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);

  const [currScreen, setCurrScreen] = useState("HOME");
  const [placeholder, setPlaceholder] = useState('Select a category first...');
  const [searchInput, setSearchInput] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const inputRef = useRef(null);

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

  const handleSortBothA2Z = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('A2Z-both');
    setAnchorEl(null);
  }
  const handleSortBothZ2A = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('Z2A-both');
    setAnchorEl(null);
  }
  const handleSortBothMR = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('MostRecent-both');
    setAnchorEl(null);
  }
  const handleSortBothLR = (event)=>{
    event.stopPropagation();
    event.preventDefault();
    props.setSortBy('LeastRecent-both');
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
      setPlaceholder('Search by userName...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: handleSortUserA2Z },
          { sortBy: 'Alphabet (Z-A)', handler: handleSortUserZ2A },
        ]
      )
    }
    else if(currScreen==='ALL_MAPS_POSTS'){
      setPlaceholder('Search by map title or post title...');
      // setPlaceholder('Search by map title/tag or post title/tag...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: handleSortBothA2Z },
          { sortBy: 'Alphabet (Z-A)', handler: handleSortBothZ2A },
          { sortBy: 'Most recent maps & post', handler: handleSortBothMR },
          { sortBy: 'Least recent maps & post', handler: handleSortBothLR },
        ]
      )
    }
    else if(currScreen==='USER_OWNED_MAPS' && auth?.user?.userName===userInfo?.currentUser?.userName){
      setPlaceholder('Search by map title...');
      // setPlaceholder('Search by map title/tag...');
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
    else if(currScreen.includes("MAPS")){
      setPlaceholder('Search by map title...');
      // setPlaceholder('Search by map title/tag...');
      setMenuItems(
        [
          { sortBy: 'Alphabet (A-Z)', handler: handleSortMapA2Z },
          { sortBy: 'Alphabet (Z-A)', handler: handleSortMapZ2A },
          { sortBy: 'Most recent publish', handler: handleSortMapMRPublish },
          { sortBy: 'Least recent publish', handler: handleSortMapLRPublish },
          
        ]
      )
    }
    else if(currScreen.includes("POSTS")){
      setPlaceholder('Search by post title...');
      // setPlaceholder('Search by post title/tag/content...');
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

  // update search input when user enter something
  const updateSearchInput = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setSearchInput(event.target.value);
    inputRef.current.value = event.target.value;
  }

  // search when user hits enter key
  const handleSearch = (event) => {
    if(event.key !== 'Enter'){
      return;
    }
    // do not search when input is empty
    const trimmedInputWithoutSpace = searchInput.replace(/(\s|\r\n|\n|\r)/gm, '');
    if(trimmedInputWithoutSpace.length === 0){
      return;
    }
    props.setSearch(searchInput);
  }

  const handleClearSearch = (event)=> {
    if (inputRef.current) {
      setSearchInput('');
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  // render menuitems based on menuItems array
  function renderDynamicMenuItems(){
    return menuItems.map((item) => {
      return <MenuItem key={item.sortBy} onClick={item.handler} id={item.sortBy}>{item.sortBy}</MenuItem>;
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
              width: (currScreen.includes("HOME") || placeholder === 'Select a category first...') ? "72.5vw" : "62.5vw",
            }}
            onSubmit={(event) => {event.preventDefault();}}
          >
            <InputBase
              disabled={placeholder === 'Select a category first...'}
              onChange={updateSearchInput}
              onKeyDown={handleSearch}
              value={searchInput}
              sx={{ ml: 1, flex: 1 }}
              placeholder={placeholder}
              inputRef={inputRef}
              endAdornment={
                (String(inputRef?.current?.value)?.replace(/(\s|\r\n|\n|\r)/gm, '').length > 0) ?
                  <ClearIcon onClick={handleClearSearch} 
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    ":hover": {
                      backgroundColor: "#aaa", 
                      transition: "background-color 0.5s", 
                    },
                    borderRadius: "50%", 
                    marginLeft: "8px",
                    transition: "background-color 1s", 
                    "&:active": {
                      backgroundColor: "#ccc", 
                    },
                  }}
                  /> :
                  null
                }
            />
          </Paper>
        </Box>
        {
          (currScreen.includes("HOME") || placeholder === 'Select a category first...') ?
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
