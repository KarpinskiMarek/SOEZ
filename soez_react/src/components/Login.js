import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginBottom: "100px"
        }}>
            <h2 style={{
                 fontWeight: "bolder"
            }}>Logowanie
            </h2>
            <LoginForm/>
        </div>
    )
}
export default Login;