import styled from "styled-components";
import React from "react";
import TripDetailsMainInfo from "./TripDetailsMainInfo";


const TripsDiv = styled.div`
  min-height: 100vh;
  max-width: 95%;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 2rem auto;
  border-radius: 5px;
  padding: 2rem;
`;

const TripDetails = () => {
    return(
        <TripsDiv>
            <TripDetailsMainInfo/>
        </TripsDiv>
    )
}

export default TripDetails;