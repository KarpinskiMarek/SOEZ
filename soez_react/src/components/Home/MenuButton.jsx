import React from 'react';
import styled from "styled-components";
import {FiMenu} from "react-icons/fi";
import Navbar from "../Layout/Navbar";

const StyledMenuButton = styled.button`
    background-color: red;
`;

const StyledFiMenu = styled(FiMenu)`
`;

const MenuButton = () => {

    return (
            <StyledMenuButton>
                <Navbar/>
            </StyledMenuButton>
    )
}

export default MenuButton;