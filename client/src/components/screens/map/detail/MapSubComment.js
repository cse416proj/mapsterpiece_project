import { useContext } from "react";
import { GlobalStoreContext } from "../../../../contexts/store";
import MapContext from "../../../../contexts/map";

import { Box } from '@mui/material';

import { CommentCard } from "../../commonProps";

export default function MapSubComment({parentComment, subcomment}){
  const { store } = useContext(GlobalStoreContext);
  const { mapInfo } = useContext(MapContext);

  const handleDeleteSubcomment = (event) => {
    event.preventDefault();
    event.stopPropagation();
    mapInfo.setCurrentSubcomment(parentComment, subcomment);
    store.setCurrentView("MAP_VIEW");
    store.markSubcommentForDeletion(subcomment);
  };

    return (
      <Box id='map-subcomment'>
        <CommentCard
          type='subcomment'
          comment={subcomment}
          deleteHandler={handleDeleteSubcomment}
        />
      </Box>
    )
}