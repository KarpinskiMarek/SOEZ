import React, { useState } from "react";
import { Container, styled, Paper, Box, TextField, Button, Typography, Grid, Card, CardMedia, CardContent, CardActions, Pagination } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

const MainDataContainer = styled(Container)(({ theme }) => ({
    marginTop: '2rem',
    alignItems: 'center',
    flexDirection: 'column',
}));

const MainTripDataForm = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '2rem',
    boxShadow: theme.shadows[5],
    maxWidth: 'xs',
    padding: '1rem',
    width: '100%'
}));

const MainBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: '2rem',
    width: '100%',
    marginBottom: '1rem'
}));

const TextFieldsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}));

const DateFieldsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: '1rem',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    paddingTop: '56.25%' // 16:9
}));

const CardGrid = styled(Container)(({ theme }) => ({
    padding: '20px 0'
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const TripDetails = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [places, setPlaces] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    const count = Math.ceil(places.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const paginatedPlaces = places.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        startingDate: '',
        endingDate: ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleApplyClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    return (
        <>
            <MainDataContainer maxWidth="sm">
                <Typography variant="h2" align="center" color="textPrimary" marginTop="4rem" gutterBottom>
                    Trip details
                </Typography>
                <MainTripDataForm>
                    <MainBox>
                        <TextFieldsBox>
                            <TextField
                                value={formData.title}
                                disabled={!isEditing}
                                id="title"
                                label="Title"
                                variant="standard"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{
                                    marginTop: '10px'
                                }}
                                onChange={handleInputChange}
                                fullWidth
                            />
                            <DateFieldsBox marginTop="2rem">
                                <TextField
                                    value={formData.startingDate}
                                    disabled={!isEditing}
                                    type="date"
                                    id="startingDate"
                                    label="Starting date"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    sx={{
                                        marginTop: '10px'
                                    }}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    value={formData.endingDate}
                                    disabled={!isEditing}
                                    type="date"
                                    id="endingDate"
                                    label="Ending date"
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    sx={{
                                        marginTop: '10px'
                                    }}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </DateFieldsBox>
                        </TextFieldsBox>
                    </MainBox>
                    {isEditing ? (
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Button variant="contained" onClick={handleApplyClick}>
                                Apply
                            </Button>
                            <Button variant="outlined" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </Box>
                    ) : (
                        <Button variant="contained" endIcon={<EditIcon />} onClick={handleEditClick}>
                            Edit
                        </Button>
                    )}
                </MainTripDataForm>
            </MainDataContainer>
            <Container maxWidth="sm">
                <Typography variant="h3" align="center" color="textPrimary" marginTop="4rem" gutterBottom>
                    Places list
                </Typography>
                <div>
                    <Grid container spacing={2} justifyContent={"center"}>
                        <Grid item>
                            <Button variant="contained" color="primary">
                                Add new place
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <CardGrid maxWidth="md">
                <Grid container spacing={4}>
                    {
                        cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <StyledCard>
                                    <StyledCardMedia
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is media card. You can use this section to describe the content
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={<InfoIcon />}>
                                                Details
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </CardActions>
                                    </CardActions>
                                </StyledCard>
                            </Grid>
                        ))
                    }
                </Grid>
                <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
                    <Pagination count={count} page={page} onChange={handlePageChange} color="primary" />
                </Grid>
            </CardGrid>
        </>
    );
}

export default TripDetails;
