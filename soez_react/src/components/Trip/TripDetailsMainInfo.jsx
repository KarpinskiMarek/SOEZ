import styled from "styled-components";
import React from "react";

const TripInfo = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  
`

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TripTitle = styled.input`
   margin: 1rem;
   width: 400px;
   height: 50px;
   border: none;
   font-size: 20px;
`;

const TripDate = styled.input`
   margin: 1rem;
   width: 150px;
   height: 20px;
    
`;


const TripDetailsMainInfo = () => {
    return (
        <TripInfo>
            <Left>
                <TripTitle type={"text"} value={"Chiny Pekin 2024"}/>
            </Left>
            <Right>
                <p>Od</p>
                <TripDate type={"date"}/>
                <p>Do</p>
                <TripDate type={"date"}/>
            </Right>
        </TripInfo>
    )
}

export default TripDetailsMainInfo;