import { useState } from 'react';
import { Box, FormControl, Tabs, Tab } from '@mui/material';

import CreateMap from './map/CreateMap';
import CreatePost from './post/CreatePost';

function CreateScreen(){
    const [tab, setTab] = useState('map');

    const handleChangeTab = (event, newTab) => {
        setTab(newTab);
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
                        id={tab === 'map' ? 'tab-selected' : 'tab'}
                        label='Create Map'
                        value='map'
                    />
                    <Tab
                        id={tab === 'post' ? 'tab-selected' : 'tab'}
                        label='Create Post'
                        value='post'
                    />
                </Tabs>
                {
                    (tab === 'map') ? <CreateMap/> : <CreatePost/>
                }
            </FormControl>
        </Box>
    )
}

export default CreateScreen;