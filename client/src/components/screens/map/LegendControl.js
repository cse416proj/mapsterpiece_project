import { Box, Typography } from "@mui/material";

export default function LegendInfoControl({ legendTitle, type, max, getColor }) {
    if(!type || type === "REGULAR"){
        return null;
    }

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
                        (index < levelArray.length - 1)?
                            (
                                `${range.start}-${range.end}`
                            ) :
                            (
                                `${range.start}+`
                            )
                    }
                </Box>
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