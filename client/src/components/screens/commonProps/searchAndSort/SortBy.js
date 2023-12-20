import { useState, useEffect } from 'react';
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';

import { DynamicCard } from '../../../cards';

export default function SortBy({sortBy, setSortBy, type, searchResult, data, setCards}){
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

    const handleSort = (event, type) =>{
        event.stopPropagation();
        event.preventDefault();
        setSortBy(type);
        setAnchorEl(null);
    }

    useEffect(() => {
        if(!data){
            return;
        }

        const result = (searchResult) ? searchResult : data;
        
        if(result){
            let sortResult = [...result];
            switch(sortBy){
                case 'A2Z-map':
                case 'Z2A-map':
                case 'A2Z-post':
                case 'Z2A-post': {
                    sortResult.sort((a, b) => {
                        const titleA = a.title.toLowerCase();
                        const titleB = b.title.toLowerCase();
                        return (sortBy.includes('A2Z')) ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
                    });
                    break;
                }
                case 'MostRecentEdit-map':
                case 'LeastRecentEdit-map': {
                    sortResult.sort((a, b) => {
                        const dateEditedA = new Date(a.dateEdited);
                        const dateEditedB = new Date(b.dateEdited);
                        return (sortBy.includes('MostRecentEdit')) ? dateEditedB - dateEditedA : dateEditedA - dateEditedB;
                    });
              
                    sortResult = sortResult.filter(map => !map.isPublished);
                    break;
                }
                case 'MostRecentPublish-map':
                case 'LeastRecentPublish-map': {
                    sortResult.sort((a, b) => {
                        const datePublishedA = new Date(a.datePublished);
                        const datePublishedB = new Date(b.datePublished);
                        return (sortBy.includes('MostRecentPublish')) ? datePublishedB - datePublishedA: datePublishedA - datePublishedB;
                    });

                    sortResult = sortResult.filter(map => map.isPublished);
                    break;
                }
                case 'MostRecent-post':
                case 'LeastRecent-post': {
                    sortResult.sort((a, b) => {
                        const updatedAtA = new Date(a.updatedAt);
                        const updatedAtB = new Date(b.updatedAt);
                        return sortBy.includes('MostRecent') ? updatedAtB - updatedAtA : updatedAtA - updatedAtB;
                    });
                    break;
                }
                case 'default-map':
                case 'default-post':
                default:
                    break;
            }

            setCards(
                sortResult?.map((pair, index) => (
                    (type === 'map') ?
                        <DynamicCard key={index} userData={null} mapData={pair} postData={null}/> :
                        <DynamicCard key={index} userData={null} mapData={null} postData={pair}/>
                ))
            );
        }
    }, [sortBy, data])

    // render menuitems based on menuItems array
    function renderDynamicMenuItems(){
        let menuItems = [];

        if(type === 'map'){
            menuItems = [
                { sortBy: 'Default', handler: (e) => handleSort(e, 'default-map') },
                { sortBy: 'Alphabet (A-Z)', handler: (e) => handleSort(e, 'A2Z-map') },
                { sortBy: 'Alphabet (Z-A)', handler: (e) => handleSort(e, 'Z2A-map') },
                { sortBy: 'Most recent edit', handler: (e) => handleSort(e, 'MostRecentEdit-map') },
                { sortBy: 'Least recent edit', handler: (e) => handleSort(e, 'LeastRecentEdit-map') },
                { sortBy: 'Most recent publish', handler: (e) => handleSort(e, 'MostRecentPublish-map') },
                { sortBy: 'Least recent publish', handler: (e) => handleSort(e, 'LeastRecentPublish-map') },
            ];
        }
        else{
            menuItems = [
                { sortBy: 'Default', handler: (e) => handleSort(e, 'default-post') },
                { sortBy: 'Alphabet (A-Z)', handler: (e) => handleSort(e, 'A2Z-post') },
                { sortBy: 'Alphabet (Z-A)', handler: (e) => handleSort(e, 'Z2A-post') },
                { sortBy: 'Most recent post', handler: (e) => handleSort(e, 'MostRecent-post') },
                { sortBy: 'Least recent post', handler: (e) => handleSort(e, 'LeastRecent-post') },
            ];
        }
        return menuItems.map((item) => {
            return <MenuItem key={item.sortBy} onClick={item.handler} id={item.sortBy}>{item.sortBy}</MenuItem>;
        });
    }

    function getSortName(){
        let sortName = '';

        if(sortBy === '' || sortBy.includes('default')){
            sortName = 'Default';
        }
        else if(sortBy.includes('A2Z')){
            sortName = 'A-Z';
        }
        else if(sortBy.includes('Z2A')){
            sortName = 'Z-A';
        }
        else if(sortBy.includes('MostRecent')){
            if(sortBy === 'MostRecentEdit-map'){
                sortName = 'Most Recent Edited Map';
            }
            else if(sortBy === 'MostRecentPublish-map'){
                sortName = 'Most Recent Published Map';
            }
            else{
                sortName = 'Most Recent Post';
            }
        }
        else if(sortBy.includes('LeastRecent')){
            if(sortBy === 'LeastRecentEdit-map'){
                sortName = 'Least Recent Edited Map';
            }
            else if(sortBy === 'LeastRecentPublish-map'){
                sortName = 'Least Recent Published Map';
            }
            else{
                sortName = 'Least Recent Post';
            }
        }
        return `(${sortName})`;
    }

    // render dropdown menu when called
    const getDropDownMenu = () => {
        return (anchorEl) ? (
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

    if(!data){
        return null;
    }

    return (
        <Box className="flex-row" id='sort-box' onClick={openMenu}>
            <Typography variant="p" id="sort-text" style={{ color: 'var(--secondary-color)' }}>
                Sort By <br/>{getSortName(sortBy)}
            </Typography>
            <SortIcon id="sort-icon" fontSize="large" style={{ color: 'var(--secondary-color)' }}/>
            { getDropDownMenu() }
        </Box>
    );
}