import styled from "styled-components";
import React from "react";


const TripsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
        </TripsDiv>
    )
}

export default TripDetails;