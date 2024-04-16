import React, {useEffect, useState} from "react";
import logo from "../../assets/logo.png"
import LinkButton from "../Home/LinkButton";
import styled from "styled-components";
import {Logout, request} from "../../service/AuthenticationConfig";
import Navbar from "./Navbar";

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
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;



const Header = ({isUserLoggedIn, navigate, toggleNavBar}) => {

    const [loggedIn, setLoggedIn] = useState(isUserLoggedIn);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setLoggedIn(isUserLoggedIn);
        if(isUserLoggedIn) {
            request("GET", "/users/get")
                .then((response) => {
                    setUserData(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.error("Błąd podczas pobierania danych", error.response)
                })
        }

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
                {loggedIn && userData ? (
                    <>
                        <UserInfo>
                            <p>Zalogowano jako: {userData.firstName} {userData.lastName}</p>
                            <LinkButton onClick={handleLogout} to={"/"} buttonText={"Wyloguj się"}/>
                            <Navbar/>
                        </UserInfo>
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