import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function DataInfoControl({ type, regionName, property, data, mapTypeData }) {
  const location = useLocation();
  if(!type){
    return null;
  }

  function renderInfo(){
    if(type === 'REGULAR'){
      return(
        (!regionName) ?
          <>
            <Typography>Region Name</Typography>
            <Typography>Hover over a region</Typography>
          </> :
          <>
            <Typography>Current Region Name</Typography>
            <Typography>{regionName}</Typography>
          </>
      );
    }
    else{
      let i = -1;
  
      for(i = 0; i < mapTypeData?.length; i++){
        const currData = mapTypeData[i];
        if(currData.regionName === regionName){
          console.log(`matches ${regionName}`);
          break;
        }
      }

      const result = (i > -1 && mapTypeData) ? mapTypeData[i] : null;

      if(type === 'CHOROPLETH'){
        return(
          <Box className='flex-column' id='data-info-container'>
            <Typography variant='h6'>{property}{(regionName)? ` @ ${regionName}` : ' @ regions'}</Typography>
            {
              (!data) ?
                <Typography>Hover over a region</Typography> : 
                (!result) ?
                  `No data has been added for ${regionName} yet.` :
                  <Typography>{result.value}</Typography>
            }
          </Box>
        )
      }
      else if(type === 'PINMAP'){
        return(
          (mapTypeData?.length === 0) ?
            <Typography variant='p'>No pin has added</Typography> :
              <Box className='flex-column' id='data-info-container'>
                <Typography variant='h6'>Property Pin{(regionName)? ` @ ${regionName}` : ' @ regions'}</Typography>
                {
                  (!data) ?
                    <Typography>Hover over a region</Typography> : 
                    (!result || result.properties.length === 0) ?
                        `No properties has been added for ${regionName} yet.` :
                        <Box className='flex-column'>
                          {
                            result.properties.map((property) => {
                              return <Typography variant='p'>{property.property}: {property.value}</Typography>
                            })
                          }
                        </Box>
                }
              </Box>
        )
      }
      else{

        return(
          (mapTypeData?.length === 0) ?
            <Typography variant='p'>No property value has added</Typography> :
              <Box className='flex-column' id='data-info-container'>
                <Typography variant='h6'>Property Value{(regionName)? ` @ ${regionName}` : ' @ regions'}</Typography>
                {
                  (!data) ?
                    <Typography>Hover over a region</Typography> : 
                    <Box>
                        {
                          (!result && regionName) ?
                            `No data has been added for ${regionName} yet.` :
                            <Typography>{result?.value}</Typography>
                        }
                    </Box>
                }
              </Box>
        )
      }
    }
  }

  return(
    <Box id='data-info-control' style={(location.pathname.includes('detail') ? { bottom: '1vh', left: '1vh' } : { top: '1vh', right: '1vh' })}>
      { renderInfo() }
    </Box>
  )
};