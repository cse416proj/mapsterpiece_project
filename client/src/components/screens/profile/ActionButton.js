import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
// import CreateIcon from '@mui/icons-material/Create';

import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import GlobalStoreContext from '../../../contexts/store';

function ActionButton({isLoggedInUser}){
    const { store } = useContext(GlobalStoreContext);
    const { userId } = useParams();

    const navigate = useNavigate();

    function handleCreateMap(event){
        console.log('handleCreateMap');
        store.setCurrentView('CREATE_MAP');
        navigate('/create');
    }

    function handleCreatePost(event){
        console.log('handleCreatePost');
        store.setCurrentView('CREATE_POST');
        navigate('/create');
    }

    function handleSearch(event){
        console.log('handleSearch');
        navigate(`/search/${userId}`);
    }

    const actions = (isLoggedInUser) ?
        [
            { icon: <SearchRoundedIcon/>, name: 'Search Map/ Post', handler: handleSearch },
            { icon: <PostAddRoundedIcon/>, name: 'Create Post', handler: handleCreatePost },
            { icon: <ExploreRoundedIcon/>, name: 'Create Map', handler: handleCreateMap },
        ] :
        [
            { icon: <SearchRoundedIcon/>, name: 'Search Map/ Post', handler: handleSearch },
        ]
    ;

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