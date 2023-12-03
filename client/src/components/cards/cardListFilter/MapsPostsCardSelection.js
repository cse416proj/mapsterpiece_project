import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function MapsPostsCardSection({ data, search, sortBy, currScreen }) {
  const [filterData, setFilteredData] = useState([]);
  console.log(sortBy, currScreen);

  // update filteredData when data/search property changes
  useEffect(() => {
    if(!data){
      return;
    }
    const result = data.filter((pair) => {
      const searchTerm = search.toLowerCase();
      return (
        searchTerm === '' ||
        pair.title.toLowerCase().includes(searchTerm) ||
        pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    if(currScreen === 'ALL_MAPS_POSTS'){
      // A-Z && Z-A
      if (sortBy.includes('2')) {
        result.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (sortBy === 'A2Z-both') {
            return titleA.localeCompare(titleB);
          } else if (sortBy === 'Z2A-both') {
            return titleB.localeCompare(titleA);
          }
          return 0;
        });
      }
      else if (sortBy.includes('Recent')) {
        result.sort((a, b) => {
          const timeA = a.fileFormat ? new Date(a.dateEdited).getTime() : new Date(a.updatedAt).getTime();
          const timeB = b.fileFormat ? new Date(b.dateEdited).getTime() : new Date(b.updatedAt).getTime();

          if (sortBy === 'MostRecent-both') {
            return timeB - timeA;
          } else if (sortBy === 'LeastRecent-both') {
            return timeA - timeB;
          }
          return 0;
        });
      }
    }
    setFilteredData(result);
  }, [data, search, sortBy]);

  return (
    <Box sx={{ width: '97.5%' }}>
      {
        filterData.map((pair, index) => {
          if(pair.hasOwnProperty('fileFormat')){
            return <DynamicCard key={`map-${index}`} userData={null} mapData={pair} postData={null}/>
          }
          else{
            return <DynamicCard key={`post-${index}`} userData={null} mapData={null} postData={pair}/>
          }
        })
      }
    </Box>
  );
};

export default MapsPostsCardSection;