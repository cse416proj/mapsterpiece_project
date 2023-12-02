import { Box, Typography } from "@mui/material";

export default function DataInfoControl({ property, data }) {
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