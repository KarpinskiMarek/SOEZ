import react from "react";
import styled from "styled-components";
import PlaceMainDetails from "./PlaceMainDetails";

const PlaceDiv = styled.div`
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


const Place = () => {
    return(
        <PlaceDiv>
            <PlaceMainDetails/>
        </PlaceDiv>
    )
}

export default Place;