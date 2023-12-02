import { useState, useContext, useEffect } from 'react';
import { Box, FormControl, Tabs, Tab } from '@mui/material';

import CreateMap from './map/CreateMap';
import CreatePost from './post/CreatePost';

import GlobalStoreContext from '../../../contexts/store';

function CreateScreen(){
    const { store } = useContext(GlobalStoreContext);
    const [tab, setTab] = useState('CREATE_MAP');

    // update create tab view when currentView changed
    useEffect(() => {
        if(store?.currentView === 'CREATE_MAP' || store?.currentView === 'CREATE_POST'){
            setTab(store?.currentView);
        }
    }, [store?.currentView])

    // update view when tab get clicked
    const handleChangeTab = (event, newTab) => {
        event.stopPropagation();
        event.preventDefault();
        store.setCurrentView(newTab);
    }

    return (
        <Box className='flex-column' id='content'>
            <FormControl className='flex-column' id='upload-form'>
                <Tabs
                    className='flex-row'
                    id='tab-section'
                    onChange={handleChangeTab}
                    value={tab}
                >
                    <Tab
                        id={tab === 'CREATE_MAP' ? 'tab-selected' : 'tab'}
                        label='Create Map'
                        value='CREATE_MAP'
                    />
                    <Tab
                        id={tab === 'CREATE_POST' ? 'tab-selected' : 'tab'}
                        label='Create Post'
                        value='CREATE_POST'
                    />
                </Tabs>
                {
                    (tab === 'CREATE_MAP') ? <CreateMap/> : <CreatePost/>
                }
            </FormControl>
        </Box>
    )
}

export default CreateScreen;