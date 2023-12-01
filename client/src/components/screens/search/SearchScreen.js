import { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Box, Typography } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import MapContext from "../../../contexts/map";
import UserContext from "../../../contexts/user";
import { SideNavBar, SearchBar, MapsCardSection, PostsCardSection, MapsPostsCardSection, DeletePostModal, DeleteMapModal, PublishMapModal, UnpublishMapModal } from "../../index";

function SearchScreen(){
    const { store } = useContext(GlobalStoreContext);
    const { userInfo } = useContext(UserContext);
    const { mapInfo } = useContext(MapContext);
    const { userId } = useParams();
    const [currScreen, setCurrScreen] = useState('');
    const [sortBy, setSortBy] = useState('');

    const [search, setSearch] = useState('');
    const [listCard, setListCard] = useState(null);

    // console.log(sortBy);

    useEffect(() => {
        if(userId){
            userInfo.getUserById(userId);
            // mapInfo.getAllPublishedMapsFromGivenUser(userId);
        }
    }, [userId])

    useEffect(() => {
        if(userInfo && userInfo.currentUser){
            mapInfo.getAllPublishedMapsFromGivenUser(userInfo.currentUser._id);
        }
    }, [userInfo?.currentUser])

    // Now update currScreen; reason: currentView changes in Store
    useEffect(() => {
    if(store?.currentView){
      setCurrScreen(store?.currentView);
    }
    }, [store?.currentView]);

    // Now update list card rendering; reason: store changes in Store or search changes in SearchScreen
    useEffect(() => {
        if(store){
            var data = store.getData(currScreen);
            // console.log(data);

            switch(store.currentView){
                case "ALL_MAPS_POSTS":
                    setListCard(<MapsPostsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
                    break;
                case "ALL_MAPS":
                case "BIN_MAPS":
                case "CHOROPLETH_MAPS":
                case "DOT_MAPS":
                case "GRAD_MAPS":
                case "HEAT_MAPS":
                    setListCard(<MapsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
                    break;
                case "ALL_POSTS":
                case "BIN_POSTS":
                case "CHOROPLETH_POSTS":
                case "DOT_POSTS":
                case "GRAD_POSTS":
                case "HEAT_POSTS":
                    setListCard(<PostsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
                    break;
                default:
                    setListCard(<Typography variant='h5' style={{ marginTop: '1.5vh' }}> You can search for your own maps and posts on this page. <br /><br />Please select Maps and/or Posts on the right.</Typography>);
                    break;
            }
        }
    }, [search, store, currScreen, sortBy]);

    return (
        <Box className='queryScreenWrapper'>
            <SideNavBar/>
            <Box className="queryScreenContent">
                <SearchBar setSearch={setSearch} setSortBy = {setSortBy}/>
                <Box className="listsDisplay">
                    { listCard }
                </Box>
                <DeletePostModal/>
                <DeleteMapModal/>
                <PublishMapModal/>
                <UnpublishMapModal/>
            </Box>
        </Box>
    )
}

export default SearchScreen;