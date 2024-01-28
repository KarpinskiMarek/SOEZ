import React, {useEffect, useState} from "react";
import logo from "../../assets/logo.png"
import LinkButton from "../LinkButton";
import styled from "styled-components";
import MenuButton from "../MenuButton";
import {Logout} from "../../service/AuthenticationService";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ced4da;
`;

const StyledDivLeft = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 145px;
  height: auto;
  margin-right: 10px;
`;

const StyledDivRight = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;



const Header = ({isUserLoggedIn, navigate}) => {

    const [loggedIn, setLoggedIn] = useState(isUserLoggedIn);

    useEffect(() => {
        setLoggedIn(isUserLoggedIn);
    }, [isUserLoggedIn, navigate]);

    const handleLogout = async () => {
        await Logout();
        setLoggedIn(false);
    }

    return (
        <StyledHeader>
            <StyledDivLeft>
                <StyledImg
                     src={logo} 
                     alt={"Logo"}
                />
                <h1>SoezTrip</h1>
            </StyledDivLeft>
            <StyledDivRight>
                {loggedIn ? (
                    <>
                        <p>Zalogowano jako: Jan Kowalski</p>
                        <LinkButton onClick={handleLogout} to={"/"} buttonText={"Wyloguj się"}/>
                        <MenuButton/>
                    </>
                ) : (
                    <>
                        <LinkButton to={"/login"} buttonText={"Zaloguj się"}/>
                        <LinkButton to={"/register"} buttonText={"Zarejestruj się"}/>
                    </>
                )}
            </StyledDivRight>
        </StyledHeader>
    )
}
export default Header;