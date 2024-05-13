import React from "react";
import styled from "styled-components";
import { IoPersonSharp } from "react-icons/io5";
import LinkButton from "../Home/LinkButton";
import { MdDelete } from "react-icons/md";
import ParticipantTile from "./ParticipantTile";

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

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AddButton = styled(LinkButton)`
  width: 600px;
  margin: 5rem;
`;

const UserName = styled.h3`
    font-size: 16px;
`;

const TripParticipants = () => {
    return(
        <MainContainer>
            <ComponentTitle>Uczestnicy</ComponentTitle>
            <AddButton to={""} buttonText={"Dodaj uczestnika"} />
            <ParticipantTile userName={"Jan Kowalski"}/>
            <ParticipantTile userName={"Marek Karpiński"}/>
            <ParticipantTile userName={"Jacek Soplica"}/>
            <ParticipantTile userName={"Norbert Oryszczak"}/>
        </MainContainer>
    )
}

export default TripParticipants;