import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

function ActionButton({isLoggedInUser}){
    const navigate = useNavigate();

    function handleCreate(event){
        console.log('handleCreateMap');
        navigate('/create');
    }

    function handleSearch(event){
        console.log('handleSearch');
        navigate('/search');
    }

    const actions = (isLoggedInUser) ?
        [
            { icon: <SearchIcon/>, name: 'Search Map/ Post', handler: handleSearch },
            { icon: <CreateIcon/>, name: 'Create Map/ Post', handler: handleCreate },
        ] :
        [
            { icon: <SearchIcon/>, name: 'Search Map/ Post', handler: handleSearch },
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