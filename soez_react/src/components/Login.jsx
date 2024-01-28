import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";

const StyledLoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: auto;
    margin-bottom: 100px;
`;

const Login = () => {
    return (
        <StyledLoginDiv>
            <LoginForm/>
        </StyledLoginDiv>
    )
}
export default Login;