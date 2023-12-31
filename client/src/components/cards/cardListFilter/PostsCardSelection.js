import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function PostsCardSection({ data, search, sortBy, currScreen }) {
  const [filterData, setFilteredData] = useState([]);
  // console.log(sortBy, currScreen);

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
        pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        pair?.postBody?.toLowerCase().includes(searchTerm)
      );
    });
    if(currScreen.includes('POST')){
      // A-Z && Z-A
      if (sortBy.includes('2')) {
        result.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (sortBy === 'A2Z-post') {
            return titleA.localeCompare(titleB);
          } else if (sortBy === 'Z2A-post') {
            return titleB.localeCompare(titleA);
          }
          return 0;
        });
      }
      // most recent & least recent
      else if (sortBy.includes('Recent')) {
        result.sort((a, b) => {
          const updatedAtA = new Date(a.updatedAt);
          const updatedAtB = new Date(b.updatedAt);

          // Adjust the return value based on sortBy
          return sortBy.includes('MostRecent') ? updatedAtB - updatedAtA : updatedAtA - updatedAtB;
        });
      }
    }

    
    setFilteredData(result);
  }, [data, search, sortBy]);

  if(!data){
    return null;
  }

  return (
    <Box sx={{ width: '97.5%' }} id="posts-cards">
      {
        filterData?.map((pair, index) => {
          return <DynamicCard key={`post-${index}`} userData={null} mapData={null} postData={pair}/>;
        })
      }
    </Box>
  );
};

export default PostsCardSection;