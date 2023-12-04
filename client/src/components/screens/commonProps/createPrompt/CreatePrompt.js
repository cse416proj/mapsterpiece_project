import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import GlobalStoreContext from "../../../../contexts/store";

export default function CreatePrompt({type}) {
    const { store } = useContext(GlobalStoreContext);

    const navigate = useNavigate();

    // navigate to create map screen
    function handleCreateMap(){
        store.setCurrentView("CREATE_MAP");
        navigate('/create');
    }

    // navigate to create post screen
    function handleCreatePost(){
        store.setCurrentView("CREATE_POST");
        navigate('/create');
    }

    function renderPrompt(message, onClickHandler){
        return(
            <Box className='flex-column' id='create-prompt'>
                <Typography>{message}</Typography>
                <Button variant='outlined' onClick={onClickHandler}>Create Now!</Button>
            </Box>
        );
    }

    return(
        (type === 'map') ?
            renderPrompt('Seems like you have not created any map yet.', handleCreateMap) :
            renderPrompt('Seems like you have not created any post yet.', handleCreatePost)
    );
}