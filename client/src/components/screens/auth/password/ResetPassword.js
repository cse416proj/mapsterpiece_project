import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Box, Typography, TextField, Button, Alert, Checkbox } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

import ValidatePassword from './ValidatePassword';
import AuthContext from '../../../../contexts/auth';

export default function ResetPassword({ form, setForm }){
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPasswordReq, setShowPasswordReq] = useState(false);
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
        }
    }, [auth?.msg])

    const handleDisplayPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowPasswordReq = () => {
        setShowPasswordReq(true);
    }

    const handleHidePasswordReq = () => {
        setShowPasswordReq(false);
    }

    const textFieldsProps = [
        { name: 'newPassword', label: 'New Password', value: form.newPassword },
        { name: 'confirmNewPassword', label: 'Confirm New Password', value: form.confirmNewPassword }
    ]

    const textFields = textFieldsProps.map((field) => {
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
    });

    // Update form field data when text field changes
    function updateForm(event){
        const field = event.target.name;
        setForm({
            ...form,
            [field]: event.target.value
        });
    }

    function handleGoBack(event){
        event.preventDefault();
        setForm({
            ...form,
            newPassword: '',
            confirmNewPassword: '',
        });
        navigate('/forgot-password');
    }

    function handleResetPassword(event){
        event.preventDefault();
        console.log('handleResetPassword');
        auth.resetPassword(form.newPassword, form.confirmNewPassword);
    }
    
    if(!auth?.lostPwUser && !auth?.msg){
        return(
            <Box className='flex-row' id='warning-screen'>
                <Box className='flex-column' id='warning-wrapper'>
                    <ReportProblemOutlinedIcon id='warning-icon'/>
                    <Typography variant='h4'>Unable to reset password without providing Email Info.</Typography>
                    <Button id='warning-outline-btn' variant='outlined' onClick={handleGoBack}>Go back</Button>
                </Box>
            </Box>
        )
    }
    return(
        <Box className='form-content'>
            { alert }
            <Typography id='reset-pw-title' variant='h2'>
                Reset Password
            </Typography>
            <form
                id='reset-pw-form'
                onSubmit={handleResetPassword}
            >
                <Box>
                    <Box id='reset-pw-textfield-container'>
                        { textFields }
                    </Box>
                    {
                        (showPasswordReq || showPassword) ?
                            <ValidatePassword password={form?.newPassword} confirmPassword={form?.confirmNewPassword} isResetting={true}/> :
                            null
                    }
                </Box>
                <Box className='flex-row' id='checkbox'>
                    <Checkbox onChange={handleDisplayPassword}/>
                    <Typography id='checkbox-prompt' variant='p'>View password</Typography>
                </Box>
                <Typography id='reset-pw-redirect-prompt' variant='p'>
                    Remember your password?
                    Sign in <Link id='redirect' to='/login'>here</Link>.
                </Typography>
                <Typography id='reset-pw-redirect-prompt' variant='p'>
                    Need an account?
                    Sign up <Link id='redirect' to='/register'>here</Link>.
                </Typography>
                <Box id='btn-container' className='flex-row'>
                    <Button id='outline-btn' variant='outlined' onClick={handleGoBack}>Go back</Button>
                    <Button id='filled-btn' variant='contained' type='submit'>Submit</Button>
                </Box>
            </form>
        </Box>
    )
}