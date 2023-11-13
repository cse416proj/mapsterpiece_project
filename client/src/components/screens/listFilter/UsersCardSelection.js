import React from 'react';
import { Box } from '@mui/material';
import { DynamicCard } from '../../index';

function UsersCardSection({ data, search }) {
  return (
    <Box sx={{ width: "97.5%" }}>
        {
            data.filter((pair)=>{
                const searchUser = search.toLowerCase();
                return (searchUser === '' ||
                        pair.userName.toLowerCase().includes(searchUser) ||
                        pair.email.toLowerCase().includes(searchUser) ||
                        pair._id.$oid.toLowerCase().includes(searchUser)
                );
            }).map((pair, index) => (
                <DynamicCard key={index} userData={pair} mapData={null} postData={null} />
            ))
        }
    </Box>
  );
};

export default UsersCardSection;