import { useState, useContext } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link } from 'react-router-dom'

import AuthContext from '../../../auth';
import { AuthErrorModal } from '../../index';

function Login(){
    const { auth } = useContext(AuthContext);
    // Form contains 2 following fields
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    // Use map to render 2 text fields
    // Temporarily accept email only, might add userName
    const textFieldsProps = [
        { name: 'email', label: 'Email', value: form.email },
        { name: 'password', label: 'Password', value: form.password },
    ]

    const textFields = textFieldsProps.map((field) => {
        return <TextField
            name={field.name}
            key={field.name}
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

    // Handle event when user submit for login
    function handleSubmit(event){
        // prevent default submit form action
        event.preventDefault();
        auth.loginUser(
            form.email,
            form.password,
        );
        console.log("login form: ",form);
        console.log('form has been submitted');
        console.log(auth);
    }
    
    return(
        <Box className='form-content'>
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
                <Typography
                    id='signin-redirect-prompt'
                    variant='p'
                >
                    Haven't registered for an account? Sign up <Link id='redirect' to='/register'>here</Link>.
                </Typography>

                <Button
                    id='filled-btn'
                    type='submit'
                    variant='contained'
                >
                    Login
                </Button>
            </form>
            <AuthErrorModal/>
        </Box>
    )
}

export default Login;