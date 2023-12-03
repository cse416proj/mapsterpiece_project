import { Box, Button, Paper, InputBase } from "@mui/material";

export default function CommentInput({handleInputChange, handleSetEditFalse, handleSubmitComment}){
  function handleOnSubmit(event){
    event.stopPropagation();
    event.preventDefault();
    handleSubmitComment();
  }

  return(
    <Box className="commentCard" sx={{ bgcolor: "#b1d7c4" }}>
      <Paper
        component="form"
        sx={{ display: "flex", alignItems: "center", width: 400, marginLeft: "10px" }}
        onSubmit={handleOnSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter your comments here..."
          onChange={handleInputChange}
          autoFocus
          onBlur={handleSetEditFalse}
        />
        <Button id="comment-submit-btn" variant="contained" onMouseDown={handleSubmitComment}>
          Submit
        </Button>
      </Paper>
    </Box>
  )
}