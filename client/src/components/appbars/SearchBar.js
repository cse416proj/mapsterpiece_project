import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Paper,
  InputBase,
} from "@mui/material";

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

export default function SearchBar(props) {
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
              placeholder="Search by ..." // to be replace with what to actually search for
              inputProps={{ "aria-label": "search google maps" }}
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
