import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import AuthContext from '../../../auth';
import MUIAccountErrorModal from '../../modals/MUIAccountErrorModal';

function Register(){
    const { auth } = useContext(AuthContext); 
    // Form contains 4 following fields
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Use map to render 4 text fields
    const textFieldsProps = [
        { name: 'firstName', label: 'First Name', value: form.firstName },
        { name: 'lastName', label: 'Last Name', value: form.lastName },
        { name: 'userName', label: 'User Name', value: form.userName },
        { name: 'email', label: 'Email', value: form.email },
        { name: 'password', label: 'Password', value: form.password },
        { name: 'confirmPassword', label: 'confirm Password', value: form.confirmPassword }
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
    console.log(auth);
    return(
        <Box className='form-content'>
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
                <Box id='signup-textfield-container'>
                    { textFields }
                </Box>
                <Typography
                    id='signup-redirect-prompt'
                    variant='p'
                >
                Already has an account? Login <Link id='redirect' to='/login'>here</Link>.
                </Typography>
                
                <Button
                    id='filled-btn'
                    type='submit'
                    variant='contained'
                >
                    Create Account
                </Button>
            </form>
            <MUIAccountErrorModal/>
        </Box>
    )
}

export default Register;