import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Typography, TextField, Button, InputAdornment, IconButton, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';

import AuthContext from '../../../contexts/auth';

function Login(){
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    // Form contains 2 following fields
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if(auth?.errMsg){
            setAlert(<Alert variant="filled" severity="error" id='auth-alert'>
                {auth.errMsg}
            </Alert>);
        }
    }, [auth?.errMsg])

    useEffect(() => {
        if(auth?.msg){
            setAlert(<Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success" id='auth-alert'>
                {auth.msg}
            </Alert>);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [auth?.msg])

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const textFieldsProps = [
        { name: 'email', label: 'Email', value: form.email },
        { name: 'password', label: 'Password', value: form.password },
    ]

    const textFields = textFieldsProps.map((field) => {
        if(field.name === 'password'){
            return <TextField
                required
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                type={(showPassword) ? "text" : "password"}
                onChange={updateForm}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleShowPassword}
                                onMouseDown={handleShowPassword}
                            >
                                { (showPassword) ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        }
        return <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            value={field.value}
            onChange={updateForm}
            required
        />;
    });

    // Update form field data when text field changes
    function updateForm(event){
        const field = event.target.name;
        setForm({
            ...form,
            [field]: event.target.value
        });
    }

    function handleForgotPw(event){
        event.preventDefault();
        navigate('/forgot-password');
    }

    // Handle event when user submit for login
    function handleSubmit(event){
        // prevent default submit form action
        event.preventDefault();
        auth.loginUser(
            form.email,
            form.password,
        );
    }
    
    return(
        <Box className='form-content'>
            { alert }
            <Typography
                id='signin-title'
                variant='h2'
            >
                Mapsterpiece<br/>Login
            </Typography>
            <form
                id='signin-form'
                onSubmit={handleSubmit}
            >
                <Box id='signin-textfield-container'>
                    { textFields }
                </Box>
                <Typography id='signin-redirect-prompt' variant='p'>
                    Haven't registered for an account? Sign up <Link id='redirect' to='/register'>here</Link>.
                </Typography>
                <Box id='btn-container' className='flex-row'>
                    <Button id='outline-btn' variant='outlined' onClick={handleForgotPw}>Forgot Password</Button>
                    <Button id='filled-btn' variant='contained' type='submit'>Login</Button>
                </Box>
            </form>
        </Box>
    )
}

export default Login;