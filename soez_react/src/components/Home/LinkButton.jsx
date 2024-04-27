import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledLinkButton = styled(Link)`
   color: black;
   font-weight: bold;
   padding: 10px 20px;
   border: solid black 2px;
   border-radius: 10px;
   margin: 10px;
   text-decoration: none;
   background-color: #48cae4;
   display: inline-block;
   cursor: pointer;

   &:hover {
     background-color: #0077b6;
   }
`;

const LinkButton = ({ to, buttonText, onClick }) => {
    return (
        <StyledLinkButton to={to} onClick={onClick}>
            {buttonText}
        </StyledLinkButton>
    );
};

export default LinkButton;