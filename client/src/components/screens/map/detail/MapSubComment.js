import { Box } from '@mui/material';
import { CommentCard } from "../../commonProps";

export default function MapSubComment({ subcomment, deleteHandler, deleteModal=null }){
    console.log("MapSubcomment", subcomment);
    return (
      <Box id='map-subcomment'>
        <CommentCard
          type='subcomment'
          comment={subcomment}
          deleteHandler={deleteHandler}
        />
        {deleteModal}
      </Box>
    )
}