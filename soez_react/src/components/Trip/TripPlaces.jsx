import React from "react";
import styled from "styled-components";
import TravelTile from "./TravelTile";
import LinkButton from "../Home/LinkButton";
import PlaceTile from "./PlaceTile";

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

const TripPlaces = () => {

    return(
        <MainContainer>
            <ComponentTitle>Plan podróży</ComponentTitle>
            <CreateButton to={"/trips/places/new"} buttonText={"Dodaj miejsce"} />
            <PlaceTile placeName={"Rzym"} dateFrom={"29.04.2024"} dateTo={"31.04.2024"}/>
            <PlaceTile placeName={"Bolonia"} dateFrom={"29.04.2024"} dateTo={"31.04.2024"}/>
            <PlaceTile placeName={"Bari"} dateFrom={"29.04.2024"} dateTo={"31.04.2024"}/>
            <PlaceTile placeName={"Neapol"} dateFrom={"29.04.2024"} dateTo={"31.04.2024"}/>
            <PlaceTile placeName={"Mediolan"} dateFrom={"29.04.2024"} dateTo={"31.04.2024"}/>
        </MainContainer>
    )
}

export default TripPlaces;