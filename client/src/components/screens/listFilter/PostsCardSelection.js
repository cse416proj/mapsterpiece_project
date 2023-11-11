import React from 'react';
import { Box } from '@mui/material';
import { DynamicCard } from '../../index';

function PostsCardSection({ data, search }) {
    console.log(data);
  return (
    <Box sx={{ width: '95%' }}>
      {data
        .filter((pair) => {
          const searchTerm = search.toLowerCase();
          return (
            searchTerm === '' ||
            pair.title.toLowerCase().includes(searchTerm) ||
            pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
            pair.postBody.toLowerCase().includes(searchTerm)
          );
        })
        .map((pair) => (
          <DynamicCard userData={null} mapData={null} postData={pair} />
        ))}
    </Box>
  );
};

export default PostsCardSection;