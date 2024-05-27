import styled from "styled-components";
import React, {useEffect, useState} from "react";
import LinkButton from "../Home/LinkButton";
import FriendTile from "./FriendTile";
import {getFriends} from "../../service/FriendsService";


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

    const [friends, setFriends] = useState([]);

    const fetchFriends = async () => {
        const friendsData = await getFriends();
        setFriends(friendsData);
    }

    useEffect(() => {
        fetchFriends();
    }, []);



    return(
        <FriendsDiv>
            <PageTitle>Lista znajomych</PageTitle>
            <AddButton to={"/friends/add"} buttonText={"Dodaj znajomego"} />
            {friends.length === 0 ? (
                <div style={{marginTop: "2rem", textDecoration:"underline"}}>Brak znajomych</div>
            ) : (
                friends.map((friend) => (
                    <FriendTile
                        key={friend.id}
                        firstName={friend.firstName}
                        lastName={friend.lastName}
                        id={friend.id}
                    />
                ))
            )}
        </FriendsDiv>
    )
}

export default Friends;