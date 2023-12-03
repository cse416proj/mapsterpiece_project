import { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Box, Typography } from "@mui/material";

import { GlobalStoreContext } from "../../../contexts/store";
import MapContext from "../../../contexts/map";
import UserContext from "../../../contexts/user";
import AuthContext from "../../../contexts/auth";

import { SideNavBar, SearchBar, MapsCardSection, PostsCardSection, MapsPostsCardSection, DeletePostModal, DeleteMapModal, PublishMapModal, UnpublishMapModal, DuplicateMapModal } from "../../index";

function SearchScreen(){
    const { store } = useContext(GlobalStoreContext);
    const { userInfo } = useContext(UserContext);
    const { mapInfo } = useContext(MapContext);
    const {auth} = useContext(AuthContext);

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
        if(userInfo && userInfo?.currentUser){
            const userMaps = userInfo.currentUser?.maps;
            const userPosts = userInfo.currentUser?.posts;
            const user = userInfo?.currentUser;
            store.getAllMapsPosts(userMaps, userPosts, user);
        }
    }, [userInfo?.currentUser])

    // Now update currScreen; reason: currentView changes in Store
    useEffect(() => {
    if(store?.currentView){
      setCurrScreen(store?.currentView);
    }
    }, [store?.currentView]);

    let UsernameBox;
    if(userInfo?.currentUser?.userName){
       UsernameBox = (
        <Box component="span" fontWeight="bold">
          {userInfo?.currentUser?.userName}
        </Box>
        ); 
    }
    
    // Now update list card rendering; reason: store changes in Store or search changes in SearchScreen
    useEffect(() => {
        if(store){
            var data = store.getData(currScreen);
            switch(currScreen){
                case "ALL_MAPS_POSTS":
                    setListCard(<MapsPostsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
                    break;
                case "USER_OWNED_MAPS":
                case "BIN_MAPS":
                case "CHOROPLETH_MAPS":
                case "DOT_MAPS":
                case "GRAD_MAPS":
                case "HEAT_MAPS":
                    setListCard(<MapsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
                    break;
                case "USER_OWNED_POSTS":
                case "BIN_POSTS":
                case "CHOROPLETH_POSTS":
                case "DOT_POSTS":
                case "GRAD_POSTS":
                case "HEAT_POSTS":
                    setListCard(<PostsCardSection data={data} search={search} sortBy={sortBy} currScreen={currScreen}/>);
                    break;
                default:
                    if(auth?.user?.userName !== userInfo?.currentUser?.userName){
                        setListCard(
                        <Typography variant='h5' style={{ marginTop: '1.5vh' }}> 
                        You can search for maps and posts owned by {UsernameBox} on this page.
                        <br /><br />Please select Maps and/or Posts on the right.
                        </Typography>); 
                    }else{
                       setListCard(
                       <Typography variant='h5' style={{ marginTop: '1.5vh' }}> 
                       You can search for your own maps and posts on this page.
                       <br /><br />Please select Maps and/or Posts on the right.
                       </Typography>); 
                    }
                    break;
            }
        }
    }, [search, store, currScreen, sortBy]);

    return (
        <Box className='queryScreenWrapper'>
            <SideNavBar setSearch={setSearch}/>
            <Box className="queryScreenContent">
                <SearchBar setSearch={setSearch} setSortBy = {setSortBy}/>
                <Box className="listsDisplay">
                    { listCard }
                </Box>
                <DeletePostModal/>
                <DeleteMapModal/>
                <PublishMapModal/>
                <UnpublishMapModal/>
                <DuplicateMapModal/>
            </Box>
        </Box>
    )
}

export default SearchScreen;