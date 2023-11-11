import { useContext } from 'react';
import { Box, Button } from '@mui/material';

import AuthContext from '../../../contexts/auth';

function Profile(){
    const { auth } = useContext(AuthContext);

    const subComment1 = {
        commentorUserName: 'joeshmo',
        text: 'Thanks!',
        dateCommented: {
            $date: "2023-11-05T19:17:42.514Z",
        }
    }

    const subComment2 = {
        commentorUserName: 'user2',
        text: 'Hell no...',
        dateCommented: {
            $date: "2023-11-05T19:17:42.514Z",
        }
    }

    const user1 = {
        _id: {
            $oid: "65482b5e0946232834874e6c",
        },
        firstName: "hi",
        lastName: "hi",
        userName: "hihi",
        email: "hi@gmail.com",
        passwordHash: "$2a$10$YRW9JZHgOzaobTx1U9kl/e3st67LEx0I0bKPHRIkgGCQKH7L.HljG",
        maps: [],
        posts: [],
        numPublishedMaps: 0,
        createdAt: {
            $date: "2023-11-05T23:55:10.885Z",
        },
        updatedAt: {
            $date: "2023-11-05T23:55:10.885Z",
        },
        __v: 0,
    }

    const user2 = {
        _id: {
            $oid: "6547ea560946232834874dd4",
        },
        firstName: "ur",
        lastName: "mom",
        userName: "urmom",
        email: "urmom@gmail.com",
        passwordHash: "$2a$10$V2g5TgHvnxj3C9zQEgAP5OcREuflnhC/jVyGzhkMMqz0XFTTdsE/a",
        maps: [],
        posts: [],
        numPublishedMaps: 0,
        createdAt: {
            $date: "2023-11-05T23:55:10.885Z",
        },
        updatedAt: {
            $date: "2023-11-05T23:55:10.885Z",
        },
        __v: 0,
    }

    const comment1 = {
        commentorUserName: 'hihi',
        text: 'good post!',
        dateCommented: {
            $date: "2023-11-05T19:17:42.514Z",
        },
        subComments: [subComment1, subComment2]
    };

    const map = {
        ownerUserName: 'joeshmo',
        title: 'Map1',
        fileFormat: "shapefile",
        mapType: "BinMap",
        map: {
            $oid: "6547ea560946232834874dd4"
        },
        tags: ['tag1' , 'tag2'],
        isPublished: false,
        comments: [ comment1 ],
        likedUsers: [
            user1
        ],
        dislikedUsers: [
            user2
        ],
        dateEdited: {
            $date: "2023-11-05T19:17:42.514Z",
        },
        datePublished: {
            $date: "2023-11-05T19:17:42.514Z",
        }
    }

    function handleDeleteAccount(event){
        auth.deleteUser(auth.user);
    }

    return(
        <Box className='content'>
            <Button onClick={handleDeleteAccount}>Delete Account</Button>
        </Box>
    )
}

export default Profile;