import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const PlaceName = styled.h2`
    font-size: 15px;
`;

const DatesInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 25%;
`;

const Date = styled.p`
    color: red;
`



const TripPlaces = () => {


    return(
        <MainContainer>
            <PlaceName>1. Mediolan</PlaceName>
            <DatesInfo>
               <Date>19.07.2024</Date>
               <Date>21.07.2024</Date>
            </DatesInfo>
        </MainContainer>
    )
}

export default TripPlaces;