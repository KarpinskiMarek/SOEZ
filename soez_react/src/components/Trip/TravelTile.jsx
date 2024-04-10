import React from "react";
import styled from "styled-components";
import { CiCircleMore } from "react-icons/ci";
import {Link} from "react-router-dom";

const Tile = styled.div`
  border-radius: 10px;
  margin: 1rem;
  width: 60%;
  padding: 1rem;
  background-color: rgba(202, 240, 248, 1);
  display: flex;
  justify-content: space-between;
  
  
  &:hover {
    background-color: rgba(72, 202, 228, 1);
  }
`;

const Left = styled.div`
  margin-left: 1rem;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TravelTitle = styled.h1`
  text-decoration: underline;
`;

const TravelTile = ({title, dateFrom, dateTo}) => {
    return (
        <Tile>
            <Left>
                <TravelTitle>{title}</TravelTitle>
                <h2>{dateFrom} - {dateTo}</h2>
            </Left>
            <Right>
                <Link to={"/"}><CiCircleMore style={{ fontSize: "3rem", color: "black"}}/></Link>
            </Right>
        </Tile>
    )
}

export default TravelTile;