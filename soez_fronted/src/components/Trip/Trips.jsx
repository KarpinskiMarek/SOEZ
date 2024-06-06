import styled from "@emotion/styled";
import { Button, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { deleteTrip, formatDate, getAllTrips } from "../../services/TripsService";

const MainContainer = styled(Container)(({ theme }) => ({
    marginTop: '2rem'
}));

const CardGrid = styled(Container)(({ theme }) => ({
    padding: '20px 0'
}));

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    paddingTop: '56.25%' // 16:9
}));

const Trip = () => {

    const [trips, setTrips] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    const count = Math.ceil(trips.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedTrips = trips.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const navigate = useNavigate();

    const fetchTrips = async () => {
        const trips = await getAllTrips();
        setTrips(trips);
    }

    const handleDeleteTrip = async (id) => {
        try {
            await deleteTrip(id);
            setTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
        } catch(e) {
            console.error("Error while deleting trip", e);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, [])

    return (
        <>
            <MainContainer maxWidth="sm">
                <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                    Your trips
                </Typography>
                <Grid container spacing={2} justifyContent={"center"}>
                    <Button variant="contained" onClick={() => navigate('/trips/new')}>
                        Create new trip
                    </Button>
                </Grid>
            </MainContainer>
            <CardGrid maxWidth="md">
                <Grid container spacing={4}>
                    {
                        paginatedTrips.map((trip) => (
                            <Grid item key={trip.id} xs={12} sm={6} md={4}>
                                <StyledCard>
                                    <StyledCardMedia
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5">
                                            {trip.title}
                                        </Typography>
                                        <Typography>
                                            {formatDate(trip.startingDate)} - {formatDate(trip.endingDate)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button 
                                            size="small" 
                                            variant="contained" 
                                            startIcon={<InfoIcon/>}>
                                                Details
                                        </Button>
                                        <Button 
                                            size="small" 
                                            variant="contained"
                                            onClick={() => handleDeleteTrip(trip.id)} 
                                            startIcon={<DeleteIcon/>}>
                                                Delete
                                        </Button>
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
    )
}

export default Trip;