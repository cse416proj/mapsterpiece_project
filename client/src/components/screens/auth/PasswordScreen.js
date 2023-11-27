import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { ForgotPassword, ResetPassword, Copyright } from '../../index';
import { useState } from 'react';

export default function PasswordScreen(){
    const location = useLocation();

    const [form, setForm] = useState({
        email: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    return(
        <Box className='default-content'>
            {
                (location.pathname === '/forgot-password') ?
                    <ForgotPassword
                        form={form}
                        setForm={setForm}
                    /> :
                    <ResetPassword
                        form={form}
                        setForm={setForm}
                    />
            }
            <Copyright/>
        </Box>
    )
}