import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

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
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FriendName = styled.h1`
  text-decoration: underline;
`;

const FriendTile = ({id, userName}) => {
    return (
        <Tile>
            <Left>
                <IoPersonSharp/>
                <FriendName>{userName}</FriendName>
            </Left>
            <Right>
                <Link to={``}><MdDelete style={{ fontSize: "3rem", color: "black"}}/></Link>
            </Right>
        </Tile>
    )
}

export default FriendTile;