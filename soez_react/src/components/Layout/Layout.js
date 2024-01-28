import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Outlet, useNavigate} from "react-router-dom";
import {isLoggedIn} from "../../service/AuthenticationService";
import styled from "styled-components";


const StyledDivFirst = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledDivSec = styled.div`
  flex: 1;
`;

const Layout = () => {

    const navigate = useNavigate();
    const isUserLoggedIn = isLoggedIn();

    return (
        <StyledDivFirst>
            <StyledDivSec>
                <Header isUserLoggedIn={isUserLoggedIn} navigate={navigate}/>
                <Outlet />
            </StyledDivSec>
            <Footer />
        </StyledDivFirst>
    )
}

export default Layout;