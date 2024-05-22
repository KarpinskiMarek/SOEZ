import react from "react";
import styled from "styled-components";
import PlaceMainDetails from "./PlaceMainDetails";
import {useParams} from "react-router-dom";

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

    const { placeId } = useParams();

    console.log(placeId);

    return(
        <PlaceDiv>
            <PlaceMainDetails placeId={placeId}/>
        </PlaceDiv>
    )
}

export default Place;