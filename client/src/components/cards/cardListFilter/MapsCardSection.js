import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function MapsCardSection({ data, search, sortBy, currScreen }) {
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

    if(currScreen.includes('MAP')){
      // A-Z && Z-A
      if (sortBy.includes('2')) {
        result.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (sortBy === 'A2Z-map') {
            return titleA.localeCompare(titleB);
          } else if (sortBy === 'Z2A-map') {
            return titleB.localeCompare(titleA);
          }
          return 0;
        });
      }
      // most recent edit & least recent edit
      else if (sortBy.includes('RecentEdit')) {
        result.sort((a, b) => {
          const dateEditedA = new Date(a.dateEdited);
          const dateEditedB = new Date(b.dateEdited);
          return sortBy.includes('MostRecentEdit') ? dateEditedB - dateEditedA : dateEditedA - dateEditedB;
        });
      }
      // most recent publish & least recent publish
      else if (sortBy.includes('RecentPublish')){
        result.sort((a,b)=>{
          const datePublishedA = new Date(a.datePublished);
          const datePublishedB = new Date(b.datePublished);
          return sortBy.includes('MostRecentPublish') ? datePublishedB - datePublishedA: datePublishedA - datePublishedB;
        })
      }

    }
    
    setFilteredData(result);
  }, [data, search, sortBy]);

  if(!data){
    return null;
  }

  return (
    <Box sx={{ width: '97.5%' }}>
      {
        filterData?.map((pair, index) => {
          return <DynamicCard key={`map-${index}`} userData={null} mapData={pair} postData={null}/>;
        })
      }
    </Box>
  );
};

export default MapsCardSection;