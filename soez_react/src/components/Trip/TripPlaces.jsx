import React, {useEffect, useState} from "react";
import styled from "styled-components";
import TravelTile from "./TravelTile";
import LinkButton from "../Home/LinkButton";
import PlaceTile from "./PlaceTile";
import {getTripPlaces} from "../../service/PlaceService";
import {formatDate} from "../../service/TripService";

const MainContainer = styled.div`
    margin-top: 10rem;
    border: solid 2px black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    background-color: rgba(255, 255, 255, 1);
    padding: 1rem;
`;

const ComponentTitle = styled.h1`
    text-decoration: underline;
    margin-bottom: 5rem;
`;

const CreateButton = styled(LinkButton)`
  width: 600px;
  margin: 5rem;
`;

const TripPlaces = ({ tripId }) => {

    const [places, setPlaces] = useState([]);

    const fetchPlaces = async () => {
        const placesData = await getTripPlaces(tripId);
        setPlaces(placesData);
    }

    useEffect(() => {
        fetchPlaces();
    }, []);

    return(
        <MainContainer>
            <ComponentTitle>Plan podróży</ComponentTitle>
            <CreateButton to={`/trips/${tripId}/places/new`} buttonText={"Dodaj miejsce"} />
            {places.map((place) => (
                <PlaceTile
                    placeName={place.name}
                    dateFrom={formatDate(place.arrive)}
                    dateTo={formatDate(place.leave)}
                />
            ))}
        </MainContainer>
    )
}

export default TripPlaces;