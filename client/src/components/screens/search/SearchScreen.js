import { useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import { SideNavBar, SearchBar, MapsCardSection, PostsCardSection, MapsPostsCardSection, DeletePostModal, DeleteMapModal } from "../../index";

function SearchScreen(){
    const { store } = useContext(GlobalStoreContext);

    const [search, setSearch] = useState('');
    const [listCard, setListCard] = useState(null);

    // Now update list card rendering; reason: store changes in Store or search changes in SearchScreen
    useEffect(() => {
        if(store){
            var data = store.getData(store.currentView);
    
            switch(store.currentView){
                case "ALL_MAPS_POSTS":
                    setListCard(<MapsPostsCardSection data={data} search={search}/>);
                    break;
                case "ALL_MAPS":
                case "BIN_MAPS":
                case "CHOROPLETH_MAPS":
                case "DOT_MAPS":
                case "GRAD_MAPS":
                case "HEAT_MAPS":
                    setListCard(<MapsCardSection data={data} search={search}/>);
                    break;
                case "ALL_POSTS":
                case "BIN_POSTS":
                case "CHOROPLETH_POSTS":
                case "DOT_POSTS":
                case "GRAD_POSTS":
                case "HEAT_POSTS":
                    setListCard(<PostsCardSection data={data} search={search}/>);
                    break;
                default:
                    setListCard(<Typography variant='h5' style={{ marginTop: '1.5vh' }}>Select Maps and/or Posts on the right.</Typography>);
                    break;
            }
        }
    }, [search, store]);

    return (
        <Box className='queryScreenWrapper'>
            <SideNavBar/>
            <Box className="queryScreenContent">
                <SearchBar setSearch={setSearch}/>
                <Box className="listsDisplay">
                    { listCard }
                </Box>
                <DeletePostModal/>
                <DeleteMapModal/>
            </Box>
        </Box>
    )
}

export default SearchScreen;