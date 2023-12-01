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
    // A-Z && Z-A
    if (sortBy.includes('2','map') && currScreen.includes('MAP')) {
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