import React from "react";
import logo from "../../assets/logo.png"
import LinkButton from "../LinkButton";

const Header = () => {
    return (
        <header style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ced4da"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center"
            }}>
                <img style={{
                    width: "145px",
                    height: "auto",
                    marginRight: "10px"
                }}
                     src={logo} 
                     alt={"Logo"}
                />
                <h1>SoezTrip</h1>
            </div>
            <div style={{
                marginRight: "10px"
            }}>
                <LinkButton to={"/login"} buttonText={"Zaloguj się"}/>
                <LinkButton to={""} buttonText={"Zarejestruj się"}/>
            </div>
        </header>
    )
}
export default Header;