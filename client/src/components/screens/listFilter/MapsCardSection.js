import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function MapsCardSection({ data, search }) {
  const [filterData, setFilteredData] = useState([]);

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
    setFilteredData(result);
  }, [data, search]);

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