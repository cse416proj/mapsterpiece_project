import { useContext } from "react";

import AuthContext from "../../../../contexts/auth";
import { PostContext } from "../../../../contexts/post";
import { GlobalStoreContext } from "../../../../contexts/store";

import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Modals } from "../../../index";

export default function PostSubComment({parentComment, subcomment}) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
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
        <AccountCircleIcon/>
        <Typography
          style={{
            textAlign: `start`,
            padding: `10px`,
            fontWeight: `bold`,
          }}
        >
          {subcomment.commenterUserName}
        </Typography>
        {
          (auth?.user?.userName === subcomment.commenterUserName) ?
            <DeleteForeverOutlinedIcon onClick={deleteSubHandler}/> :
            null
        }
      </Box>
      <Typography
        style={{
          textAlign: `start`,
          padding: `10px`,
        }}
      >
        {subcomment.content}
      </Typography>
      <Modals/>
    </Box>
  );
}  