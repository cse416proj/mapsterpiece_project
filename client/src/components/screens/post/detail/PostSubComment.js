import React, { useContext, useEffect } from "react";
import { PostContext } from "../../../../contexts/post";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GlobalStoreContext } from "../../../../contexts/store";
import { DeleteSubCommModal } from "../../../index";

export default function PostSubComment({parentComment, subcomment}) {
    const { store } = useContext(GlobalStoreContext);
    const { postInfo } = useContext(PostContext);

    function deleteSubHandler(event){
      console.log("deleteSubHandler");
      event.stopPropagation();
      event.preventDefault();
      postInfo.setCurrentSubcomment(parentComment, subcomment);
      store.markSubcommentForDeletion(subcomment);
    }

    if(!subcomment){
        return null;
    }

    return (
      <Box className="commentCard">
        <Box className="commentUserInfo">
          <AccountCircleIcon />
          <Typography
            style={{
              textAlign: `start`,
              padding: `10px`,
              fontWeight: `bold`,
            }}
          >
            {subcomment.commenterUserName}
          </Typography>
          <DeleteForeverOutlinedIcon onClick={deleteSubHandler}/>
        </Box>
        <Typography
          style={{
            textAlign: `start`,
            padding: `10px`,
          }}
        >
          {subcomment.content}
        </Typography>
        <DeleteSubCommModal/>
      </Box>
    );
}  