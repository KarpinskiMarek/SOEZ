import React from "react";
import styled from "styled-components";

const StyledLinkButton = styled.a`
  color: black;
  font-weight: bold;
  padding: 10px 20px;
  border: solid black 2px;
  border-radius: 10px;
  margin: 10px;
  text-decoration: none;
  background-color: #48cae4;
  display: inline-block;

  &:hover {
    background-color: #0077b6;
  }
`;

const LinkButton = ({ to, buttonText }) => {
    return (
        <StyledLinkButton href={to}>
            {buttonText}
        </StyledLinkButton>
    );
};

export default LinkButton;