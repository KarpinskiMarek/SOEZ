import styled from "styled-components";
import React from "react";
import LinkButton from "../Home/LinkButton";
import TravelTile from "./TravelTile";


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

const TilesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
`;

const CreateButton = styled(LinkButton)`
  width: 600px;
  margin: 5rem;
`;

const Trips = () => {
    return(
        <TripsDiv>
            <CreateButton to={"/trips/new"} buttonText={"Utwórz podróż"} t/>
            <TilesList>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
                <TravelTile title={"Włochy 2024"} dateFrom={"21.07.2024"} dateTo={"30.07.2024"}/>
                <TravelTile title={"Jesien Hiszpania"} dateFrom={"11.09.2024"} dateTo={"18.09.2024"}/>
                <TravelTile title={"Narty Austria"} dateFrom={"02.02.204"} dateTo={"12.02.2024"}/>
                <TravelTile title={"Majówka"} dateFrom={"01.05.2024"} dateTo={"05.05.2024"}/>
            </TilesList>
        </TripsDiv>
    )
}

export default Trips;