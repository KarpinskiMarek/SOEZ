import { Box, Container, TextField, styled, Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const NewPlaceForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        arrive: '',
        leave: '',
        ticket: '',
        country: ''
    });

    const [errors, setErros] = useState({
        name: '',
        arrive: '',
        leave: '',
        ticket: '',
        country: ''
    });

    const navigate = useNavigate();

    const validateForm = () => {
        return true;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = () => {
        if (validateForm) {
            console.log(formData);
        }
    }

    return (
        <FormContainer maxWidth="sm">
            <FormBox>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        id="name"
                        label="Place name"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        fullWidth
                        sx={{ margin: '10px' }}
                    />
                    <TextField
                        id="arrive"
                        label="Arrive date"
                        type="date"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        value={formData.arrive}
                        onChange={handleChange}
                        error={!!errors.arrive}
                        helperText={errors.arrive}
                        fullWidth
                        sx={{ margin: '10px' }}
                    />
                    <TextField
                        id="leave"
                        label="Leave date"
                        type="date"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        value={formData.leave}
                        onChange={handleChange}
                        error={!!errors.leave}
                        helperText={errors.leave}
                        fullWidth
                        sx={{ margin: '10px' }}
                    />
                    <TextField
                        id="ticket"
                        label="Ticket"
                        type="file"
                        InputLabelProps={{
                            shrink: true
                        }}
                        variant="outlined"
                        value={formData.ticket}
                        onChange={handleChange}
                        error={!!errors.ticket}
                        helperText={errors.ticket}
                        fullWidth
                        sx={{ margin: '10px' }}
                    />
                    <TextField
                        id="country"
                        label="Country"
                        variant="outlined"
                        value={formData.country}
                        onChange={handleChange}
                        error={!!errors.country}
                        helperText={errors.country}
                        fullWidth
                        sx={{ margin: '10px' }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ margin: '10px' }}>
                        Add place
                    </Button>
                </Form>
            </FormBox>
        </FormContainer>
    )

}

export default NewPlaceForm;