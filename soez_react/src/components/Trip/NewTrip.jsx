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
  background-color: rgba(255,255,255,0.9);
  margin: 2rem auto;
  border-radius: 5px;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
`;

const NewTrip = () => {
    return(
        <FormDiv>
            <PageTitle>Utwórz nową podróż</PageTitle>
            <NewTripForm/>
        </FormDiv>
    )
}

export default NewTrip;