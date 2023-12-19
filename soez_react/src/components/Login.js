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
            margin: "auto",
            marginBottom: "100px",
        }}>
            <LoginForm/>
        </div>
    )
}
export default Login;