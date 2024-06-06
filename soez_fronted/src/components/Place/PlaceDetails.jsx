import { Container, styled, Typography, Box, Paper, Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

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

const Map = ({ location }) => {
    const mapContainerStyle = {
        height: '100%',
        width: '100%'
    };

    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const APIkey = '';

    useEffect(() => {
        if (location.name && location.country) {
            const geocoder = new window.google.maps.Geocoder()
            geocoder.geocode({ address: `${location.name}, ${location.country}` }, (results, status) => {
                if (status === "OK") {
                    setCenter(results[0].geometry.location);
                }
            });
        }
    }, [location]);

    return (
        <LoadScript googleMapsApiKey={APIkey}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

const PlaceDetails = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Mumbai',
        arrive: '06.06.2024',
        leave: '08.06.2024',
        country: 'India'
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
                    <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
                        34°C 
                    </Typography>
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
                        defaultValue=""
                        fullWidth
                    />
                    <Box sx={{ display: 'flex', gap: '10px', margin: '2rem' }}>
                        <Button variant="contained" endIcon={<EditIcon />}>
                            Edit
                        </Button>
                        <Button variant="outlined" endIcon={<SmartToyIcon/>}>
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