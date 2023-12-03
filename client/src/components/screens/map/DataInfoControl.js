import { Box, Typography } from "@mui/material";

export default function DataInfoControl({ type, regionName, property, data }) {
  if(!type){
    return null;
  }

  if(type === "REGULAR"){
    return(
      <Box id="data-info-control">
        {
          (!regionName) ?
            <>
              <Typography>Region Name</Typography>
              <Typography>Hover over a region</Typography>
            </> :
            <>
              <Typography>Current Region Name</Typography>
              <Typography>{regionName}</Typography>
            </>
        }
      </Box>
    )
  }

  return (
    <Box id="data-info-control">
      <Typography>{property}</Typography>
      {
        (data && data[property]) &&
        <Typography>{data[property]}</Typography>
      }
      {
        !data &&
        <Typography>Hover over a region</Typography>
      }
    </Box>
  )
};