import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export default function ValidatePassword({password, confirmPassword, isResetting=false}){
    const [fulfillLength, setFulfillLength] = useState(false);
    const [fulfillConfirmLength, setFulfillConfirmLength] = useState(false);
    const [fulfillMatch, setFulfillMatch] = useState(false);

    useEffect(() => {
        setFulfillLength((password?.length >= 8) ? true : false);
        setFulfillConfirmLength((confirmPassword?.length >= 8) ? true : false);
        setFulfillMatch((password?.length > 0 && password === confirmPassword) ? true : false);
    }, [password, confirmPassword]);

    const requirements = (isResetting) ? 
        (
            [
                { text: 'New Password has length of 8', condition: fulfillLength },
                { text: 'Confirm New Password has length of 8', condition: fulfillConfirmLength },
                { text: 'Confirm New Password matches password', condition: fulfillMatch },
            ]
        )
        : (
            [
                { text: 'Password has length of 8', condition: fulfillLength },
                { text: 'Confirm Password has length of 8', condition: fulfillConfirmLength },
                { text: 'Confirm Password matches password', condition: fulfillMatch },
            ]
        );

    const requirementText = requirements.map((req) => {
        return (
            <Box className='flex-row' key={req.text}>
                {
                    (req.condition) ?
                        <CheckCircleIcon id="valid-icon"/> :
                        <ErrorIcon id="invalid-icon"/>
                }
                <Typography variant='p' id='pw-req-text'>{req.text}</Typography>
            </Box>
        )
    });

    return (
        <Box className='flex-column' id='pw-req-box'>
            <Typography variant='h6' id='pw-req-title'>Password requirement</Typography>
            <Box>
                {
                    requirementText
                }
            </Box>
        </Box>
    )
}