import styled from "styled-components";
import React from "react";
import TripDetailsMainInfo from "./TripDetailsMainInfo";
import {useParams} from "react-router-dom";
import TripPlaces from "./TripPlaces";


const TripsDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  max-width: 95%;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 2rem auto;
  border-radius: 5px;
  padding: 2rem;
`;

const TripDetails = () => {

    const { id } = useParams();

    return(
        <TripsDiv>
            <TripDetailsMainInfo tripId={id}/>
            <TripPlaces/>
        </TripsDiv>
    )
}

export default TripDetails;