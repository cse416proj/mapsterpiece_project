import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MapIcon from '@mui/icons-material/Map';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

function ActionButton(){
    const navigate = useNavigate();

    function handleCreateMap(event){
        console.log('handleCreateMap');
        navigate('/create');
    }

    function handleCreatePost(event){
        console.log('handleCreatePost');
        navigate('/create');
    }

    function handleSearch(event){
        console.log('handleSearch');
    }

    const actions = [
        { icon: <SearchIcon/>, name: 'Search', handler: handleSearch },
        { icon: <CreateIcon/>, name: 'Create Post', handler: handleCreatePost },
        { icon: <MapIcon/>, name: 'Create Map', handler: handleCreateMap },
    ];

    const fabStyle = {
        sx: {
            bgcolor: 'var(--icon-hover)',
            color: 'white',
            '&:hover': {
                bgcolor: 'var(--icon)',
                color: 'white',
            }
        }
    };

    return(
        <SpeedDial
            id='action-button'
            ariaLabel="SpeedDial basic"
            icon={<SpeedDialIcon/>}
            FabProps={fabStyle}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.handler}
                    FabProps={fabStyle}
                />
            ))}
        </SpeedDial>
    );
}

export default ActionButton;