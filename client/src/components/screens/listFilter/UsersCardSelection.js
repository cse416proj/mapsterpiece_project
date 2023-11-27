import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function UsersCardSection({ data, search }) {
  const [filterData, setFilteredData] = useState([]);

  // update filteredData when data/search property changes
  useEffect(() => {
    if(!data){
      return;
    }
    const result = data.filter((pair) => {
      const searchUser = search.toLowerCase();
      return (
        searchUser === '' ||
        pair.userName.toLowerCase().includes(searchUser) ||
        pair.email.toLowerCase().includes(searchUser) ||
        pair._id.$oid.toLowerCase().includes(searchUser)
      );
    });
    setFilteredData(result);
  }, [data, search]);
  
  return (
    <Box sx={{ width: "97.5%" }}>
      {
        filterData.map((pair) => (
          <DynamicCard key={`${pair.userName}`} userData={pair} mapData={null} postData={null}/>
        ))
      }
    </Box>
  );
}

export default UsersCardSection;