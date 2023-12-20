import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { Warning } from '../../warnings';
import ValidatePassword from './password/ValidatePassword';

import AuthContext from '../../../contexts/auth';

function Register(){
    const { auth } = useContext(AuthContext); 
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPasswordReq, setShowPasswordReq] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if(auth?.errMsg){
            setAlert(<Alert variant="filled" severity="error" id='auth-alert' style={{ margin: '2.5vh auto 0 auto'}}>
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

    const textFieldsProps = [
        { name: 'userName', label: 'User Name', value: form.userName },
        { name: 'email', label: 'Email', value: form.email },
        { name: 'password', label: 'Password', value: form.password },
        { name: 'confirmPassword', label: 'Confirm Password', value: form.confirmPassword }
    ]

    const handleDisplayPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowPasswordReq = () => {
        setShowPasswordReq(true);
    }

    const handleHidePasswordReq = () => {
        setShowPasswordReq(false);
    }

    const textFields = textFieldsProps.map((field) => {
        if(field.name === 'password' || field.name === 'confirmPassword'){
            return <TextField
                required
                key={field.name}
                name={field.name}
                label={field.label}
                value={field.value}
                type={(showPassword) ? "text" : "password"}
                onChange={updateForm}
                onFocus={handleShowPasswordReq}
                onBlur={handleHidePasswordReq}
            />
        }
        return <TextField
            required
            key={field.name}
            name={field.name}
            label={field.label}
            value={field.value}
            onChange={updateForm}
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

    // Handle event when user submit for registration
    function handleSubmit(event){
        // prevent default submit form action
        event.preventDefault();

        auth.registerUser(
            form.firstName,
            form.lastName,
            form.userName,
            form.email,
            form.password,
            form.confirmPassword
        )

        console.log('form has been submitted');
    }

    if(auth?.user){
        return <Warning message='User have already logged in.'/>;
    }

    return(
        <Box className='form-content'>
            { alert }
            <Typography
                id='signup-title'
                variant='h2'
            >
                Sign Up
            </Typography>
            <form
                id='signup-form'
                onSubmit={handleSubmit}
            >
                <Box style={{ height: '45vh' }}>
                    <Box id='signup-textfield-container'>
                        <Box className='flex-row' style={{ width: '100%', justifyContent: 'space-between'}}>
                            <TextField required name='firstName' label='First Name' value={form.firstName} onChange={updateForm} style={{ width: '55%'}}/>
                            <TextField required name='lastName' label='Last Name' value={form.lastName} onChange={updateForm}/>
                        </Box>
                        { textFields }
                    </Box>
                    {
                        (showPasswordReq || showPassword) ?
                            <ValidatePassword password={form?.password} confirmPassword={form?.confirmPassword}/> :
                            null
                    }
                </Box>
                <Box className='flex-column' style={{ alignSelf: 'flex-start', marginLeft: '32.5vw' }}>
                    <Box className='flex-row' id='checkbox' style={{ marginLeft: '0', marginBottom: '1vh' }}>
                        <Checkbox onChange={handleDisplayPassword}/>
                        <Typography id='checkbox-prompt' variant='p'>View password</Typography>
                    </Box>
                    <Typography id='signup-redirect-prompt' variant='p' style={{ marginLeft: '0'}}>
                        Already has an account? Login <Link id='redirect' to='/login'>here</Link>.
                    </Typography>
                </Box>
                <Button id='filled-btn' type='submit' variant='contained'>
                    Create Account
                </Button>
            </form>
        </Box>
    )
}

export default Register;