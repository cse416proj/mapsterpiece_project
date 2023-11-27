import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Typography, TextField, Button, Alert } from '@mui/material';

import AuthContext from '../../../../contexts/auth';

export default function ForgotPassword({ form, setForm }){
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    // Update form field data when text field changes
    function updateForm(event){
        const field = event.target.name;
        setForm({
            ...form,
            [field]: event.target.value
        });
    }

    function handleSignUp(event){
        event.preventDefault();
        navigate('/register');
    }

    function handleSubmit(event){
        event.preventDefault();
        if(form?.email?.length > 0){
            auth.findUser(form.email);
        }
    }

    return(
        <Box className='form-content'>
            {
                (auth?.errMsg) ? 
                    <Alert variant="filled" severity="error" id='auth-alert'>
                        {auth.errMsg}
                    </Alert> :
                    null
            }
            <Typography id='forgot-pw-title' variant='h2'>
                Forgot<br/>Password
            </Typography>
            <form
                id='forgot-pw-form'
                onSubmit={handleSubmit}
            >
                <Box id='forgot-pw-textfield-container'>
                    <TextField
                        name='email'
                        label='Email'
                        value={form.email}
                        onChange={updateForm}
                        required
                    />
                </Box>
                <Typography id='forgot-pw-redirect-prompt' variant='p'>
                    Remember your password? Sign in <Link id='redirect' to='/login'>here</Link>.
                </Typography>
                <Box id='btn-container' className='flex-row'>
                    <Button id='outline-btn' variant='outlined' onClick={handleSignUp}>Sign Up</Button>
                    <Button id='filled-btn' variant='contained' type='submit'>Next</Button>
                </Box>
            </form>
        </Box>
    )
}