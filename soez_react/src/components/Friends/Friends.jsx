import styled from "styled-components";
import React, {useEffect, useState} from "react";
import LinkButton from "../Home/LinkButton";
import ParticipantTile from "../Trip/ParticipantTile";
import FriendTile from "./FriendTile";


const FriendsDiv = styled.div`
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

const AddButton = styled(LinkButton)`
  width: 600px;
  margin: 5rem;
`;

const PageTitle = styled.h1`
  text-decoration: underline;
  margin-bottom: 3rem;
`;

const Friends = () => {

    return(
        <FriendsDiv>
            <PageTitle>Lista znajomych</PageTitle>
            <AddButton to={"/friends/add"} buttonText={"Dodaj znajomego"} />
            <FriendTile userName={"Jan Kowalski"}/>
            <FriendTile userName={"Adam Małysz"}/>
        </FriendsDiv>
    )
}

export default Friends;