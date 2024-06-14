import { Container, styled, Typography, Box, Paper, Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editPlace, editPlacePlan, generatePlacePlan, getPlace, getPlaceWeather } from "../../services/PlaceService";
import { formatDateInput } from "../../services/TripsService";
import { getWeatherIconPath } from "../../services/WeatherIconService";
import Map from "../Maps/MyMap";

const MainDataContainer = styled(Container)(({ theme }) => ({
    marginTop: '2rem',
    alignItems: 'center',
    flexDirection: 'column',
}));

const ComponentSpace = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '2rem',
    boxShadow: theme.shadows[5],
    maxWidth: 'xs',
    padding: '1rem',
    width: '100%',
    marginBottom: '2rem'
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

const MapBox = styled(Box)(({ theme }) => ({
    height: '400px',
    width: '100%',
    marginTop: '2rem'
}));

const WeatherStatusInfo = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const PlaceDetails = () => {

    const { tripId, placeId } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        arrive: '',
        leave: '',
        country: '',
        prompt: ''
    });

    const [plan, setPlan] = useState('');

    const [weatherData, setWeatherData] = useState({
        city: '',
        temperature: '',
        description: ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handlePlanChange = (event) => {
        setPlan(event.target.value);
    };

    const handleApplyClick = (e) => {
        e.preventDefault();
        handleSubmit(e);
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

    const fetchPlace = async () => {
        const placeData = await getPlace(placeId);
        if (placeData) {
            setFormData({
                ...placeData,
                arrive: formatDateInput(placeData.arrive),
                leave: formatDateInput(placeData.leave)
            });
            setPlan(placeData.prompt);
        }
    };

    const fetchWeather = async () => {
        const weatherData = await getPlaceWeather(placeId);
        if (weatherData) {
            setWeatherData(weatherData.data);
        }
    };

    useEffect(() => {
        fetchPlace();
        fetchWeather();
    }, [tripId, placeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await editPlace(
                tripId, 
                placeId, 
                formData.name,
                formData.arrive,
                formData.leave,
                formData.country
            );
            if (response && response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error while editing place");
        }
    }

    const handleGeneratePlan = async () => {
        try {
            const response = await generatePlacePlan(placeId, tripId, formData.name);
            console.log(response);
            if (response && response.status === 200) {
                window.location.reload();
            }
        } catch(error) {
            console.error("Error while generating plan", error);
        }
    }

    const handleEditPlan = async () => {
        try {
            const response = await editPlacePlan(tripId, placeId, plan);
            console.log(response);
            if (response && response.status === 201) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error while editing plan", error);
        }
    }

    return (
        <>
            <MainDataContainer maxWidth="md">
                <Typography variant="h2" align="center" color="textPrimary" marginTop="4rem" gutterBottom>
                    Place details
                </Typography>
                <ComponentSpace>
                    <MainBox>
                        <TextFieldsBox>
                            <TextField
                                value={formData.name}
                                disabled={!isEditing}
                                id="name"
                                label="Name"
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
                                value={formData.country}
                                disabled={!isEditing}
                                id="country"
                                label="Country"
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
                                    value={formData.arrive}
                                    disabled={!isEditing}
                                    type="date"
                                    id="arrive"
                                    label="Arrive date"
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
                                    value={formData.leave}
                                    disabled={!isEditing}
                                    type="date"
                                    id="leave"
                                    label="Leave date"
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
                    <MapBox>
                        <Map location={formData} />
                    </MapBox>
                </ComponentSpace>
                <ComponentSpace>
                    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                        Current weather
                    </Typography>
                    <WeatherStatusInfo variant="h5" color="textPrimary" gutterBottom>
                        {weatherData.temperature}°C
                        <img src={getWeatherIconPath(weatherData.description)} alt={weatherData.description} style={{ width: 30, height: 30, marginLeft: 8 }} /> 
                    </WeatherStatusInfo>
                </ComponentSpace>
                <ComponentSpace>
                    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                        Place visit plan
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Enter trip plan here..."
                        multiline
                        rows={12}
                        value={plan}
                        onChange={handlePlanChange}
                        fullWidth
                    />
                    <Box sx={{ display: 'flex', gap: '10px', margin: '2rem' }}>
                        <Button variant="contained" onClick={handleEditPlan} endIcon={<EditIcon />}>
                            Edit
                        </Button>
                        <Button variant="outlined" onClick={handleGeneratePlan} endIcon={<SmartToyIcon/>}>
                            Generate
                        </Button>
                    </Box>
                </ComponentSpace>
                <ComponentSpace>
                    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                        Tickets
                    </Typography>
                </ComponentSpace>
            </MainDataContainer>
        </>
    )
}

export default PlaceDetails;