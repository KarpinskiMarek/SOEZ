import React from "react";
import logo from '../../assets/logo.png'
import LinkButton from "../LinkButton/LinkButton";
import '../../styles/Layout.css'

const Header = () => {
    return (
        <header className={"header"}>
            <div>
                <img src={logo} alt={"Logo"}/>
                <h1>SoezTrip</h1>
            </div>
            <div>
                <LinkButton to={""} buttonText={"Zaloguj się"}/>
                <LinkButton to={""} buttonText={"Zarejestruj się"}/>
            </div>
        </header>
    )
}

export default Header;