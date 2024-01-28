import React from 'react';
import styled from "styled-components";
import {FiMenu} from "react-icons/fi";

const StyledMenuButton = styled.button`
    width: 3rem;
    height: 3rem;
`;

const MenuButton = ({onClick}) => {
    return (
        <StyledMenuButton onClick={onClick}>
            <FiMenu />
        </StyledMenuButton>
    )
}

export default MenuButton;