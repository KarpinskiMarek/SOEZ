import styled from "styled-components";
import React, {useEffect, useState} from "react";
import AddFriendForm from "./AddFriendForm";

const FormDiv = styled.div`
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

const AddFriend = () => {

    return(
        <FormDiv>
            <AddFriendForm/>
        </FormDiv>
    )
}

export default AddFriend;