import React from 'react';
import { Box } from '@mui/material';
import { DynamicCard } from '../../index';

function MapsCardSection({ data, search }) {
  return (
    <Box sx={{ width: '95%' }}>
      {data
        .filter((pair) => {
          const searchTerm = search.toLowerCase();
          return (
            searchTerm === '' ||
            pair.title.toLowerCase().includes(searchTerm) ||
            pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
          );
        })
        .map((pair) => (
          <DynamicCard userData={null} mapData={pair} postData={null} />
        ))}
    </Box>
  );
};

export default MapsCardSection;