import React from "react";
import styled from "styled-components";
import NewTripForm from "./NewTripForm";

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 95%;
  background-color: white;
  margin: 2rem auto;
  border-radius: 5px;
  padding: 2rem;
`;

const NewTrip = () => {
    return(
        <FormDiv>
            <NewTripForm/>
        </FormDiv>
    )
}

export default NewTrip;