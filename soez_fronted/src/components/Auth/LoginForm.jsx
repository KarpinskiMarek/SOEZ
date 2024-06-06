import { Button, Container, TextField, styled, Box } from "@mui/material";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthenticationService";
import { setAuthHeader } from "../../services/Authconfig";

const FormContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
}));

const FormBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(12),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
}));

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
}));

const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const validateForm = () => {
        return true;
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Dane poprawne');
            try {
                const response = await login(formData.username, formData.password);
                if (response && response.status === 200) {
                    setAuthHeader(response.data.accessToken);
                    navigate("/trips");
                }
            } catch (error) {
                console.error("Error while login", error);
            }
        }
    }

    return (
        <FormContainer maxWidth="sm">
            <FormBox>
            <Form onSubmit={handleSubmit}>
                <TextField 
                    id="username" 
                    label="Email..." 
                    variant="outlined"
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={{margin: '5px'}}/>
                <TextField 
                    id="password" 
                    type='password' 
                    label="Password..." 
                    variant="outlined"
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username} 
                    sx={{margin: '5px'}}/>
                <Button
                    type="submit" 
                    variant="contained" 
                    sx={{margin: '5px'}}>
                        Login
                </Button>
            </Form>
            </FormBox>
        </FormContainer>
    )

}

export default LoginForm;