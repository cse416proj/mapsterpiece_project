import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { DynamicCard } from '../../index';

function UsersCardSection({ data, search, sortBy, currScreen }) {
  const [filterData, setFilteredData] = useState([]);
  // console.log(sortBy, currScreen);

  useEffect(() => {
    if (!data) {
      return;
    }
    const result = data.filter((pair) => {
      const searchUser = search.toLowerCase();
      return (
        searchUser === '' ||
        pair.userName.toLowerCase().includes(searchUser) ||
        pair.email.toLowerCase().includes(searchUser) ||
        (pair._id && pair._id.toLowerCase().includes(searchUser))
      );
    });
  // A-Z && Z-A
    if (sortBy.includes('user') && currScreen === 'ALL_USERS') {
      result.sort((a, b) => {
        const usernameA = a.userName.toLowerCase();
        const usernameB = b.userName.toLowerCase();

        if (sortBy === 'A2Z-user') {
          return usernameA.localeCompare(usernameB);
        } else if (sortBy === 'Z2A-user') {
          return usernameB.localeCompare(usernameA);
        }
        return 0;
      });
    }
    setFilteredData(result);
  }, [data, search, sortBy]);

  return (
    <Box sx={{ width: "97.5%" }} id="users-cards">
      {filterData.map((pair) => (
        <DynamicCard key={`${pair.userName}`} userData={pair} mapData={null} postData={null} />
      ))}
    </Box>
  );
}

export default UsersCardSection;
