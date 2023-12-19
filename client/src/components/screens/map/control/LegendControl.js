import { Box, Typography } from '@mui/material';
import markerIcon from 'leaflet/dist/images/marker-icon.png';

export default function LegendControl({ legendTitle, type, max, getColor }) {
    if(!type || type === 'REGULAR'){
        return null;
    }

    const levels = (max >= 5) ? 5 : max;

    const levelArray = Array.from({ length: levels }, (_, index) => {
        let start = Math.round((max / levels) * index);
        let end = Math.round((max / levels) * (index + 1));

        if(start >= 10){
            start = Math.round(start / 10) * 10;
        }
        if(end >= 10){
            end = Math.round(end / 10) * 10;
        }
        
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

    function getInterval(range){
        if(range.start !== range.end){
            return `${range.start}-${range.end}`;
        }
        return `${range.start}-${range.end+1}`;
    }

    function getHighestInterval(range){
        return (range > 0) ? `${range}+` : `${max}+`;
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
                                            getInterval(range)
                                        ) :
                                        (
                                            getHighestInterval(range.start)
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
                                                getInterval(range)
                                            ) :
                                            (
                                                getHighestInterval(range.start)
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
                            return(
                                <Box key={index} className='flex-row' id='legend-row'>
                                    <Box id='legend-color-box' style={{ backgroundColor: getHeatColor(index) }}></Box>
                                    {
                                        (index < levelArray.length - 1)?
                                            (
                                                getInterval(range)
                                            ) :
                                            (
                                                getHighestInterval(range.start)
                                            )
                                    }
                                </Box>
                            )
                        })
                    }
                </>
            )
        }
        else if(type === 'DOT_DISTRIBUTION'){
            if(!max){
                return <Typography>No data has been provided.</Typography>;
            }
            return(
                <Box className='flex-row' id='legend-row' style={{ width: '70%' }}>
                    <Box id='legend-dot' style={{ borderRadius: '25px', marginRight: '1vw', width: '1.5vh', height: '1.5vh', backgroundColor: 'green' }}></Box>
                    <Typography>Dot</Typography>
                </Box>
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