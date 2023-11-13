import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function PostsCardSection({ data, search }) {
  const [filterData, setFilteredData] = useState([]);

  // update filteredData when data/search property changes
  useEffect(() => {
    const result = data.filter((pair) => {
      const searchTerm = search.toLowerCase();
      return (
        searchTerm === '' ||
        pair.title.toLowerCase().includes(searchTerm) ||
        pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        pair.postBody.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredData(result);
  }, [data, search]);

  return (
    <Box sx={{ width: '97.5%' }}>
      {
        filterData.map((pair, index) => {
          return <DynamicCard key={`post-${index}`} userData={null} mapData={null} postData={pair}/>;
        })
      }
    </Box>
  );
};

export default PostsCardSection;