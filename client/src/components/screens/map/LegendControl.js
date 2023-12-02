import { Box, Typography } from "@mui/material";

export default function LegendInfoControl({ legendTitle, max, palette, getColor }) {
    const levels = 5;

    const levelArray = Array.from({ length: levels }, (_, index) => {
        const start = Math.round((max / levels) * index / 10) * 10;
        const end = Math.round((max / levels) * (index + 1) / 10) * 10;
        return { start, end };
    });

    function renderLegend(){
        return(
            levelArray.map((range, index) => (
                <Box key={index}>
                    <Box style={{ background: getColor(range.start + 1), width: '20px', height: '20px', display: 'inline-block' }}></Box>
                    {
                        `${range.start}-${range.end}`
                        // (index < levelArray.length - 1)?
                        //     (
                        //         <Typography>{grade}&ndash;{levelArray[index + 1]}<br /></Typography>
                        //     ) :
                        //     (
                        //         <Typography>{grade}+</Typography>
                        //     )
                    }
                </Box>
                // <div >
                //   <div ></div>
                //   {index < levelArray.length - 1 ? (
                //     <span>{grade}&ndash;{levelArray[index + 1]}<br /></span>
                //   ) : (
                //     <span>{grade}+</span>
                //   )}
                // </div>
            ))
        )
    }

    return (
      <Box id="legend-control">
        <Typography>{legendTitle}</Typography>
        { renderLegend() }
      </Box>
    )
};