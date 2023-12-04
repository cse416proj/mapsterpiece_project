import { Box, Typography } from '@mui/material';
import markerIcon from 'leaflet/dist/images/marker-icon.png';

export default function LegendInfoControl({ legendTitle, type, max, getColor }) {
    if(!type || type === 'REGULAR'){
        return null;
    }

    const levels = 5;

    const levelArray = Array.from({ length: levels }, (_, index) => {
        const start = Math.round((max / levels) * index / 10) * 10;
        const end = Math.round((max / levels) * (index + 1) / 10) * 10;
        return { start, end };
    });

    function getRadius(index){
        return(
            (index === 4) ? 12 :
                (index === 3) ? 9 :
                    (index === 2) ? 6 :
                        (index === 1) ? 4 :
                            2
        )
    }

    function getHeatColor(index){
        return(
            (index === 4) ? '#FF1D1A' :
                (index === 3) ? '#FCA915' :
                    (index === 2) ? '#EFF925' :
                        (index === 1) ? '#87F34B' :
                        '#9FA6DF'
        )
    }

    function renderLegend(){
        if(type === 'CHOROPLETH'){
            if(!max){
                return <Typography>No data has been provided.</Typography>;
            }
            return(
                <>
                    <Box className='flex-row' id='legend-row'>
                        <Box id='legend-color-box' style={{ background: 'white', borderColor: '#86C9B5' }}></Box>
                        <Typography variant='p'>No data</Typography>
                    </Box>

                    {
                        levelArray.map((range, index) => (
                            <Box key={index} className='flex-row' id='legend-row'>
                                <Box id='legend-color-box' style={{ background: getColor(range.start + 1) }}></Box>
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
                    }
                </>
            )
        }
        else if(type === 'PINMAP'){
            return(
                <Box className='flex-row' id='legend-row'>
                    <Box
                        component='img'
                        alt='Pin marker'
                        src={`${markerIcon}`}
                        style={{ width: '1vw', marginRight: '1vw' }}
                    />
                    <Typography>Pin marker</Typography>
                </Box>
            );
        }
        else if(type === 'GRADUATED_SYMBOL'){
            if(!max){
                return <Typography>No data has been provided.</Typography>;
            }
            return(
                <>
                    {
                        levelArray.map((range, index) => {
                            const radius = getRadius(index) * 2;
                            return(
                                <Box key={index} className='flex-row' id='legend-row'>
                                    <Box id='legend-color-box' style={{ borderRadius: '100%', backgroundColor: 'red', width: `${radius}px`, height: `${radius}px` }}></Box>
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
                            )
                        })
                    }
                </>
            )
        }
        else if(type === 'HEATMAP'){
            if(!max){
                return <Typography>No data has been provided.</Typography>;
            }
            return(
                <>
                    {
                        levelArray.map((range, index) => {
                            // const radius = getRadius(index) * 2;
                            return(
                                <Box key={index} className='flex-row' id='legend-row'>
                                    <Box id='legend-color-box' style={{ backgroundColor: getHeatColor(index) }}></Box>
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
                            )
                        })
                    }
                </>
            )
        }
        return;
    }

    return (
      <Box id='legend-control'>
        <Typography variant='h6'>{legendTitle}</Typography>
        { renderLegend() }
      </Box>
    )
};