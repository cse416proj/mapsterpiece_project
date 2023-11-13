import React from 'react';
import { Box } from '@mui/material';
import { DynamicCard } from '../../index';

function MapsPostsCardSection({ data, search }) {
  return (
    <Box sx={{ width: '97.5%' }}>
      {data
        .filter((pair) => {
          const searchTerm = search.toLowerCase();
          return (
            searchTerm === '' ||
            pair.title.toLowerCase().includes(searchTerm) ||
            pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
          );
        })
        .map((pair, index) => {
          console.log(index);
          if(pair.hasOwnProperty('fileFormat')){
            return <DynamicCard key={`map${{index}}`} userData={null} mapData={pair} postData={null} />
          }
          else{
            return <DynamicCard key={`post${{index}}`} userData={null} mapData={null} postData={pair} />
          }
        })}
    </Box>
  );
};

export default MapsPostsCardSection;